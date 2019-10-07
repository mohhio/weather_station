import { eventChannel, buffers, END } from 'redux-saga';
import { takeEvery, put, call, take, cancelled, all, fork } from 'redux-saga/effects';
import { CONNECT, SCAN, actionCreator } from './action';
import axios from 'axios';
import base64 from 'react-native-base64';

import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';
import config from '../firebase';
import { actionCreator as log } from './../Log/action';
import { actionCreator as miKettleActionCreator } from '../Kettle/action';
const myFirebaseApp = firebase.initializeApp(config);

const rsf = new ReduxSagaFirebase(myFirebaseApp);

const parser = (string) => {
	return string.substring(2).split(' H=');
};

export function* onScanSaga(action) {
	//sprawdzenie czy mozemy skanowac?
	const manager = action.payload;
	yield put(log.addLog('Skanownie rozpoczętne...'));
	const scanningChannel = yield eventChannel((emit) => {
		let scanning = true;

		manager.startDeviceScan(null, { allowDuplicates: false }, (error, scannedDevice) => {
			console.log(scannedDevice.name);
			emit([ 'miss', scannedDevice ]);
			if (error) {
				emit([ error, scannedDevice ]);
				return;
			}
			if (scanning) {
				if (scannedDevice != null && scannedDevice.localName === 'MJ_HT_V1') {
					console.log('znalazl termomter');
					emit([ error, scannedDevice ]);
					scanning = false;
				}

				// if (scannedDevice != null && scannedDevice.localName === 'MiKettle') {
				// 	console.log('znalazl czajnik');
				// 	emit([ error, scannedDevice ]);
				// 	scanning = false;
				// }
			} else {
				console.log('zamkniecie');
				manager.stopDeviceScan();
				emit(END);
			}
		});
		return () => {
			manager.stopDeviceScan();
		};
	}, buffers.expanding(1));

	try {
		while (true) {
			const [ error, scannedDevice ] = yield take(scanningChannel);

			

			if (error != null) {
			}
			if (error === 'miss' && scannedDevice != null) {
				yield put(log.addLog(scannedDevice.name));
			} else {
				if (scannedDevice != null && scannedDevice.localName === 'MJ_HT_V1') {
					yield call(console.log, 'scan:', scannedDevice);
					yield put(actionCreator.putDevice(scannedDevice));
					yield put(actionCreator.connect(scannedDevice));
				}

				if (scannedDevice != null && scannedDevice.localName === 'MiKettle') {
					yield call(console.log, 'scan:', scannedDevice);
					yield put(miKettleActionCreator.putDevice(scannedDevice));
					yield put(miKettleActionCreator.connect(scannedDevice));
				}
			}
		}
	} catch (error) {
	} finally {
		yield call(console.log, 'Scanning stopped...');
		yield put(log.addLog('Skanownie zakończone...'));
		if (yield cancelled()) {
			scanningChannel.close();
		}
	}
}

export function* onConnectSaga(action) {
	const device = action.payload;
	const manager = device._manager;

	console.log('Actual device:' + device.name);
	yield put(log.addLog('Łącze z ' + device.name));

	try {
		yield call([ device, device.cancelConnection ]);
	} catch (e) {
		console.log('eetam');
	}
	const connect = yield call([ device, device.connect ]);
	yield call(console.log, connect);

	yield call([ connect, connect.discoverAllServicesAndCharacteristics ]);
	yield put(log.addLog('Serwisy i charakterystyki odkryte'));

	const servicesForDevice = yield call([ manager, manager.servicesForDevice ], device.id);
	yield put(log.addLog('Serwisy pobrane'));

	const service = servicesForDevice.filter((service) => service.uuid === '226c0000-6476-4566-7562-66734470666d')[0];

	yield call(console.log, service);
	const characteristics = yield call([ manager, manager.characteristicsForDevice ], service.deviceID, service.uuid);
	yield put(log.addLog('Charakterystyki pobrane'));
	const characteristic = characteristics[0];
	yield call(console.log, characteristic);
	yield put(log.addLog('Rozpoczęcie nasłuchiwania na dane'));
	const temperatureChannel = yield eventChannel((emit) => {
		let emitting = true;
		characteristic._manager.monitorCharacteristicForDevice(
			characteristic.deviceID,
			characteristic.serviceUUID,
			characteristic.uuid,
			(error, char) => {
				try {
					if (char.value !== null) {
						if (emitting) {
							const temp = parser(base64.decode(char.value));
							console.log('Before emit>>>', temp);
							emit([ error, temp ]);
							//emitting = false;
						} else {
							emit(END);
						}
					}
				} catch (e) {
					console.log('e:', e);
					console.log('error', error);
					emit(END);
				}
			}
		);
		return () => {
			console.log('sie rozlaczylo');
			// manager.stopDeviceScan();
		};
	}, buffers.expanding(1));

	try {
		while (true) {
			const [ error, temp ] = yield take(temperatureChannel);

			if (error != null) {
			}
			if (temp != null) {
				yield call(console.log, temp);
				const t = temp[0];
				const h = temp[1];
				const date = Date.now();
				yield put(actionCreator.putTemperature(t));
				yield put(actionCreator.putHumidity(h));

				yield call(rsf.database.create, 'temperature', { t, date });
				yield call(rsf.database.create, 'humidity', { h, date });
				console.log("test api")
				
				axios.post('http://192.168.1.8:8080/api/temperature', { value: t, dateTime: date }).then(function (response) {
					console.log('response',response);
				  })
				  .catch(function (error) {
					console.log('error',error);
				  });;
				  
				//yield call(axios.post, "http://localhost:8080/api/temperature", { value: t, dateTime: date });
				console.log('end test api');
				yield put(log.addLog('Nowe dane - T:'+t+" H:"+h));
				// yield put(actionCreator.putDevice(scannedDevice));
				// yield put(actionCreator.connect(scannedDevice));
			}
		}
	} catch (error) {
	} finally {
		yield call(console.log, 'Temperature stopped...');
		if (yield cancelled()) {
			yield put(log.addLog('Zakończenie nasłuchiwania'));
			yield call([ device, device.cancelConnection ]);
			temperatureChannel.close();
		}
	}
}

export function* connectSaga() {
	yield takeEvery(CONNECT, onConnectSaga);
}

export function* scanSaga() {
	yield takeEvery(SCAN, onScanSaga);
}

export function* thermometerSaga() {
	yield all([ fork(scanSaga), fork(connectSaga) ]);
}
