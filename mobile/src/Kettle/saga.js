import {CONNECT, SCAN} from './action';
import { eventChannel, buffers, END } from 'redux-saga';
import { takeEvery, put, call, take, cancelled, all, fork } from 'redux-saga/effects';
import { actionCreator as log } from './../Log/action';

export function* onConnectSaga(action)
{
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

	console.log("Services: ",servicesForDevice);

	const service1 = servicesForDevice.filter((service) => service.uuid === '00001800-0000-1000-8000-00805f9b34fb')[0];
	//yield call(console.log, service1);

	const service2 = servicesForDevice.filter((service) => service.uuid === '00001801-0000-1000-8000-00805f9b34fb')[0];
	//yield call(console.log, service2);

	const service3 = servicesForDevice.filter((service) => service.uuid === '0000180a-0000-1000-8000-00805f9b34fb')[0];
	//yield call(console.log, service3);

	const service4 = servicesForDevice.filter((service) => service.uuid === '0000fe95-0000-1000-8000-00805f9b34fb')[0];
	// call(console.log, service4);

	const service5 = servicesForDevice.filter((service) => service.uuid === '0000fee8-0000-1000-8000-00805f9b34fb')[0];
	//yield call(console.log, service5);

	const service6 = servicesForDevice.filter((service) => service.uuid === '01344736-0000-1000-8000-262837236156')[0];
	//yield call(console.log, service6);

	// const characteristics1 = yield call([ manager, manager.characteristicsForDevice ], service1.deviceID, service1.uuid);
	// console.log("CHARAKTERYSTYKA dla serwisu:", service1.uuid);
	// console.log(characteristics1);

	// const characteristics2 = yield call([ manager, manager.characteristicsForDevice ], service2.deviceID, service2.uuid);
	// console.log("CHARAKTERYSTYKA dla serwisu:", service2.uuid);
	// console.log(characteristics2);

	// const characteristics3 = yield call([ manager, manager.characteristicsForDevice ], service3.deviceID, service3.uuid);
	// console.log("CHARAKTERYSTYKA dla serwisu:", service3.uuid);
	// console.log(characteristics3);

	// const characteristics4 = yield call([ manager, manager.characteristicsForDevice ], service4.deviceID, service4.uuid);
	// console.log("CHARAKTERYSTYKA dla serwisu:", service4.uuid);
	// console.log(characteristics4);

	// const characteristics5 = yield call([ manager, manager.characteristicsForDevice ], service5.deviceID, service5.uuid);
	// console.log("CHARAKTERYSTYKA dla serwisu:", service5.uuid);
	// console.log(characteristics5);

	const characteristics6 = yield call([ manager, manager.characteristicsForDevice ], service6.deviceID, service6.uuid);
	console.log("CHARAKTERYSTYKA dla serwisu:", service6.uuid);
	console.log(characteristics6);

	yield put(log.addLog('Charakterystyki pobrane'));

	 const characteristic = characteristics6[0];
	 yield call(console.log, characteristic);
	 yield put(log.addLog('Rozpoczęcie nasłuchiwania na dane'));

	const channel = yield eventChannel((emit) => {
		let emitting = true;
		characteristic._manager.monitorCharacteristicForDevice(
			characteristic.deviceID,
			characteristic.serviceUUID,
			characteristic.uuid,
			(error, char) => {
				try {
					if (char.value !== null) {
						if (emitting) {
							// const temp = base64.decode(char.value);
							console.log('Before emit>>>', char);
							// emit([ error, temp ]);
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

	// try {
	// 	while (true) {
	// 		const [ error, temp ] = yield take(channel);

	// 		if (error != null) {
	// 		}
	// 		if (temp != null) {
	// 			yield call(console.log, temp);
	// 			const t = temp[0];
	// 			const h = temp[1];
	// 			const date = Date.now();
	// 			yield put(actionCreator.putTemperature(t));
	// 			yield put(actionCreator.putHumidity(h));

	// 			yield call(rsf.database.create, 'temperature', { t, date });
	// 			yield call(rsf.database.create, 'humidity', { h, date });
	// 			yield put(log.addLog('Nowe dane - T:'+t+" H:"+h));
	// 			// yield put(actionCreator.putDevice(scannedDevice));
	// 			// yield put(actionCreator.connect(scannedDevice));
	// 		}
	// 	}
	// } catch (error) {
	// } finally {
	// 	yield call(console.log, 'Temperature stopped...');
	// 	if (yield cancelled()) {
	// 		yield put(log.addLog('Zakończenie nasłuchiwania'));
	// 		yield call([ device, device.cancelConnection ]);
	// 		temperatureChannel.close();
	// 	}
	// }
}

export function* connectSaga() {
	yield takeEvery(CONNECT, onConnectSaga);
	
}

export function* scanSaga() {
	//yield takeEvery(SCAN, onScanSaga);
}

export function* kettleSaga() {
	yield all([ fork(scanSaga), fork(connectSaga) ]);
}
