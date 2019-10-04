// @flow

import { put, call } from 'redux-saga/effects';
import { Device, Service, Characteristic } from 'react-native-ble-plx';
import { log, logError } from './Reducer';
import base64 from 'react-native-base64';

export type SensorTagTestMetadata = {
	id: string,
	title: string,
	execute: (device: Device) => Generator<any, boolean, any>
};

export const SensorTagTests: { [string]: SensorTagTestMetadata } = {
	READ_ALL_CHARACTERISTICS: {
		id: 'READ_ALL_CHARACTERISTICS',
		title: 'Read all characteristics',
		execute: readAllCharacteristics
	},
	READ_TEMPERATURE: {
		id: 'READ_TEMPERATURE',
		title: 'Read temperature',
		execute: readTemperature
	}
};

let seen = [];
function funcString(key, val) {
	if (val != null && typeof val == 'object') {
		if (seen.indexOf(val) >= 0) {
			return;
		}
		seen.push(val);
	}
	return val;
}

function* readAllCharacteristics(device: Device): Generator<*, boolean, *> {
	try {
		const services: Array<Service> = yield call([ device, device.services ]);

		for (const service of services) {
			yield put(log('Found service: ' + service.uuid));
			const characteristics: Array<Characteristic> = yield call([ service, service.characteristics ]);
			for (const characteristic of characteristics) {
				// if (characteristic.uuid === "00002a02-0000-1000-8000-00805f9b34fb")
				//if (characteristic.uuid === "00000014-0000-1000-8000-00805f9b34fb" || characteristic.uuid === "00000013-0000-1000-8000-00805f9b34fb" || characteristic.uuid === "00000004-0000-1000-8000-00805f9b34fb" || characteristic.uuid === "00000002-0000-1000-8000-00805f9b34fb")
				if (characteristic.uuid === '226caa55-6476-4566-7562-66734470666d') {
					yield put(log('Found characteristic: ' + characteristic.uuid));
					let output2 = '';
					// for (let entry in characteristic) {
					//   output += 'key: ' + entry + ' | value: ' + characteristic[entry] + '\n';
					// }
					// yield put(log(output));
					let characer;
					let error;
					let a = yield characteristic.monitor((err, char) => {
						characer = char;
						error = err;
					});
					yield put(log(JSON.stringify(a, funcString)));
					yield put(log('characer:', characer));
					yield put(log('error:', error));
					yield put(log('MANAGER2:'));

					// for (let entry in characteristic._manager) {
					//   output2 += 'key: ' + entry + ' | value: ' + characteristic._manager[entry] + '\n';
					// }

					yield put(log(JSON.stringify(characteristic._manager, funcString)));

					// characteristic._manager.addListener(
					// 	'BleManagerDidUpdateValueForCharacteristic',
					// 	this.handleUpdateValueForCharacteristic
					// );

					characteristic.addListener(
						'BleManagerDidUpdateValueForCharacteristic',
						({ value, peripheral, characteristic, service }) => {
							// Convert bytes array to string
              //const data = bytesToString(value);
              alert(value);
						//	console.log(`Recieved ${data} for characteristic ${characteristic}`);
						}
					);

					if (characteristic.isReadable) {
						yield put(log('Reading value...'));
						var c = yield call([ characteristic, characteristic.read ]);
						yield put(log('Got base64 value: ' + base64.decode(c.value) + ' : ' + c.value));
						if (characteristic.isWritableWithResponse) {
							yield call([ characteristic, characteristic.writeWithResponse ], c.value);
							yield put(log('Successfully written value back'));
						}
					}
				}
			}
		}
	} catch (error) {
		yield put(logError(error));
		return false;
	}

	return true;
}

function* readTemperature(device: Device): Generator<*, boolean, *> {
	yield put(log('Read temperature'));
	return false;
}
