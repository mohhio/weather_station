import React from 'react';
import { StyleSheet, Text, View, Button, PermissionsAndroid } from 'react-native';
//import App from './src/App';
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64';
import config from './src/firebase';
import firebase from 'firebase';

class App extends React.Component {
	constructor() {
		super();
		this.manager = new BleManager();
		this.state = {
			temp: null,
			acctual: '',
			countdown: 60
		};
	}

	componentDidMount() {
		firebase.initializeApp(config);
		this._interval = setInterval(() => {
			this.countdownMinus();
		}, 1000);
		this.scanAndConnect();
		this._interval2 = setInterval(() => this.scanAndConnect(), 30000);
		//setInterval(, 1000);
	}

	countdownMinus() {
		let newCountdown = this.state.countdown - 1;
		if (this.countdown === 0) {
			newCountdown = 60;
		}
		this.setState({ countdown: newCountdown });
	}
	componentWillUnmount() {
		clearInterval(this.countdown);
	}

	scanAgain = () => {
		this.scanAndConnect();
	};

	grandPerrmistions = () => {
		console.log('Scanning: Checking permissions...');

		//
		console.log('DATA RETRIEVED');
		PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((enabled) => {
			if (!enabled) {
				console.log('Scanning: Permissions disabled, showing...');
				PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((granted) => {
					if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
						console.log('Scanning: Permissions not granted, aborting...');
					}
				});
			} else {
				console.log(enabled);
			}
		});
	};

	parser = (string) => {
		return string.substring(2).split(' H=');
	};

	scanAndConnect = () => {
		console.log('start scaning');

		this.manager.startDeviceScan(null, null, (error, device) => {
			if (error) {
				return;
			}

			console.log(device.name);
			this.setState({ acctual: device.name });
			if (device.name === 'MJ_HT_V1') {
				this.setState({ acctual: device.name });
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
								console.log(error);
								const temp = this.parser(base64.decode(char.value));

								this.setState({ temp });
								
								const t = parseFloat(temp[0]);
								const h = parseFloat(temp[1]);

								const date = Date.now();
								firebase.database().ref('temperature').push({ t, date });
								firebase.database().ref('humidity').push({ h, date });
							
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
				this.manager.stopDeviceScan();
			}
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={{ fontSize: 15, color: '#FFF' }}>
					{this.state.countdown} - {this.state.acctual}
				</Text>
				<Text style={{ fontSize: 30, color: '#00FF41' }}>
					{this.state.temp && `TEMPERATURA:${this.state.temp[0]}°C`}
				</Text>
				<Text style={{ fontSize: 30, color: '#00FF41' }}>
					{this.state.temp && `WILGONTOŚĆ: ${this.state.temp[1]}`}%
				</Text>
				<Button onPress={() => this.scanAndConnect()} title="Podłącz sie do termometra" />
				<Button onPress={() => this.grandPerrmistions()} title="Pozwolenia" />
			</View>
		);
	}
}

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
