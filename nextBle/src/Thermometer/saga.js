import { takeEvery } from 'redux-saga/effects';
import {CONNECT, actionCreator} from './action';

import base64 from 'react-native-base64';
// import firebase from 'firebase';

const parser = (string) => {
    return string.substring(2).split(' H=');
};

export function* onConnectSaga(action) {
    console.log(action.payload);

    console.log('z sagi connect');
    console.log('start scaning');
    const manager = action.payload;   
    


    // firebase.initializeApp(config);

    manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
            return;
        }

        //console.log(device.name);
        
        console.log("Actual device:"+device.name )

        if (device.name === 'MJ_HT_V1') {

            console.log("Actual device:"+device.name )
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
                                    console.log("temperatura:"+temp)
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
                                console.log('error',error);
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
                

            manager.stopDeviceScan();
        }
    });
}



    



export function* connectSaga() {
    yield takeEvery(CONNECT, onConnectSaga);
}
