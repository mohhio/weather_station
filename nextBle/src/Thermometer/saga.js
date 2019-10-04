import { eventChannel, buffers, END } from 'redux-saga';
import { takeEvery, put, call, take, cancelled, all, fork } from 'redux-saga/effects';
import { CONNECT, SCAN, actionCreator } from './action';

import base64 from 'react-native-base64';
// import firebase from 'firebase';

const parser = (string) => {
	return string.substring(2).split(' H=');
};

export function* onScanSaga(action) {
	//sprawdzenie czy mozemy skanowac?
	const manager = action.payload;
	const scanningChannel = yield eventChannel((emit) => {
		let scanning = true;
		manager.startDeviceScan(null, { allowDuplicates: true }, (error, scannedDevice) => {
			console.log(scannedDevice.name);

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
			if (scannedDevice != null) {
				yield call(console.log, 'scan:', scannedDevice);
				yield put(actionCreator.putDevice(scannedDevice));
				yield put(actionCreator.connect(scannedDevice));
			}
		}
	} catch (error) {
	} finally {
		yield call(console.log, 'Scanning stopped...');
		if (yield cancelled()) {
			scanningChannel.close();
		}
	}
}

export function* onConnectSaga(action) {
	const device = action.payload;
	console.log('device >>>>', device);

	console.log('Actual device:' + device.name);
    console.log('znalazł');
    
	device
		.connect()
		.then((device) => {
			return device.discoverAllServicesAndCharacteristics();
		})
		.then((device) => {
			console.log(device._manager);
			const servicesForDevice = device._manager.servicesForDevice(device.id);
			return servicesForDevice;
		})
		.then((services) => {
			return services.filter((service) => service.uuid === '226c0000-6476-4566-7562-66734470666d')[0];
		})
		.then((service) => {
			console.log(service);
			return service._manager.characteristicsForDevice(service.deviceID, service.uuid);
		})
		.then((characteristics) => {
			return characteristics[0];
		})
		.then((characteristic) => {
			characteristic._manager.monitorCharacteristicForDevice(
				characteristic.deviceID,
				characteristic.serviceUUID,
				characteristic.uuid,
				(error, char) => {
					try {
						if (char.value !== null) {
							//const temp = base64.decode(char.value);
							const temp = parser(base64.decode(char.value));
							console.log('temperatura:' + temp);
							//this.setState({ temp });
							const t = parseFloat(temp[0]);
							const h = parseFloat(temp[1]);
							actionCreator.putTemperature(t);
							actionCreator.putHumidity(h);
							const date = Date.now();
							//firebase.database().ref('temperature').push({ t, date });
							//firebase.database().ref('humidity').push({ h, date });
						}
					} catch (e) {
						console.log('e:', e);
						console.log('error', error);
					}
				}
			);
			return characteristic;
		})
		.then((characteristic) => {
			characteristic._manager.stopDeviceScan();
		})
		.catch((error) => {
			//this.scanAgain();
			console.log(error);
		});
	//manager.stopDeviceScan();
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
