import React from 'react';
import { StyleSheet, Text, View, Button, PermissionsAndroid } from 'react-native';
import App from './App';
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64';
import config from './firebase';
import firebase from 'firebase';
import { Container, Header } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import IconFontMC from 'react-native-vector-icons/MaterialCommunityIcons';

class SmartHome extends React.Component {
	constructor() {
		super();
		this.manager = new BleManager();
		this.state = {
			temp: null,
			acctual: '',
			countdown: 60,
			colors: [
				'#F44336',
				'#E91E63',
				'#9C27B0',
				'#673AB7',
				'#3F51B5',
				'#2196F3',
				'#03A9F4',
				'#00BCD4',
				'#009688',
				'#009688',
				'#4CAF50',
				'#FFEB3B'
			]
		};
	}

	componentDidMount() {
		firebase.initializeApp(config);
		this._interval = setInterval(() => {
			this.countdownMinus();
		}, 1000);
		this.scanAndConnect();
		//this._interval2 = setInterval(() => this.scanAndConnect(), 30000);
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

			//console.log(device.name);
			this.setState({ acctual: device.name });

			thermometer
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

			//kettle
			// if (device.name === 'MiKettle') {
			// 	console.log('znalazł czajnik');
			// 	device
			// 		.connect()
			// 		.then((device) => {
			// 			console.log(device);
			// 			return device.discoverAllServicesAndCharacteristics();
			// 		})
			// 		.then((device) => {
			// 			console.log(servicesForDevice);
			// 			const servicesForDevice = device._manager.servicesForDevice(device.id);
			// 			return servicesForDevice;
			// 		})
			// 		.then((services) => {
			// 			return services.filter((service) => service.uuid === '01344736-0000-1000-8000-262837236156')[0];
			// 		})
			// 		.then((service) => {
			// 			return service._manager.characteristicsForDevice(service.deviceID, service.uuid);
			// 		})
			// 		.then((characteristics) => {
			// 			//0000aa02-0000-1000-8000-00805f9b34fb -status characteristics

			// 			//characteristics.map((characteristic)=>{
			// 				console(characteristics);
			// 				const characteristic = characteristics[3];
			// 				characteristic._manager.monitorCharacteristicForDevice(
			// 					characteristic.deviceID,
			// 					characteristic.serviceUUID,
			// 					characteristic.uuid,
			// 					(error, char) => {
			// 						console.log(error);
			// 						console.log(char)
			// 					}
			// 				)
						

			// 			//console.log(characteristics[1]);
			// 			return characteristics[1];
			// 		})
			// 		// .then((characteristic) => {
			// 		// 	console.log(characteristic);
			// 		// 	characteristic._manager.monitorCharacteristicForDevice(
			// 		// 		characteristic.deviceID,
			// 		// 		characteristic.serviceUUID,
			// 		// 		characteristic.uuid,
			// 		// 		(error, char) => {
			// 		// 			console.log(error);
			// 		// 			console.log(char)
			// 		// 			// const temp = this.parser(base64.decode(char.value));

			// 		// 			// this.setState({ temp });

			// 		// 			// const t = parseFloat(temp[0]);
			// 		// 			// const h = parseFloat(temp[1]);

			// 		// 			// const date = Date.now();
			// 		// 			// firebase.database().ref('temperature').push({ t, date });
			// 		// 			// firebase.database().ref('humidity').push({ h, date });
			// 		// 		}
			// 		// 	);

			// 		//	return characteristic;
			// 		//});
			// }
		});
	};

	render() {
		return (
			//
			//
			//
			<Container>
				<Header />
				<Grid>
					<Col style={{ backgroundColor: this.state.colors[0], height: 200, width: 200 }}>
						<View style={styles.container}>
							<Text style={{ fontSize: 30, color: '#FFF' }}>
								<IconFontMC name="thermometer" size={50} />
								{this.state.temp && `${this.state.temp[0]}°C`}
							</Text>
						</View>
					</Col>
					<Col style={{ backgroundColor: this.state.colors[2], height: 200 }}>
						<View style={styles.container}>
							<Text style={{ fontSize: 30, color: '#FFF' }}>
								<IconFontMC name="water" size={50} />
								{this.state.temp && `${this.state.temp[1]}`}%
							</Text>
						</View>
					</Col>
				</Grid>
				<Grid>
					<Col style={{ backgroundColor: this.state.colors[1], height: 200 }}>
						<Button onPress={() => this.scanAndConnect()} title="Podłącz sie do termometra 1" />
					</Col>
					<Col style={{ backgroundColor: this.state.colors[4], height: 200 }}>
						<Button onPress={() => this.grandPerrmistions()} title="Pozwolenia" />
					</Col>
				</Grid>
				<Grid>
					<Col style={{ backgroundColor: this.state.colors[3], height: 200 }}>
						<Text style={{ fontSize: 15, color: '#FFF' }}>
							{this.state.countdown} - {this.state.acctual}
						</Text>
					</Col>
					<Col style={{ backgroundColor: this.state.colors[6], height: 200 }}>
						<View style={styles.container} />
					</Col>
				</Grid>
				<Grid>
					<Col style={{ backgroundColor: this.state.colors[5], height: 200 }} />
					<Col style={{ backgroundColor: this.state.colors[7], height: 200 }} />
				</Grid>
			</Container>
		);
	}
}

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		textAlignVertical: 'center'
	}
});
