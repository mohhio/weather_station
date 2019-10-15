import React from 'react';
import { StyleSheet, Text, View, Button, PermissionsAndroid, ScrollView, Dimensions } from 'react-native';
//import App from './App';
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64';
import config from './firebase';
import firebase from 'firebase';
import { Container, Header } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
// import IconFontMC from 'react-native-vector-icons/MaterialCommunityIcons';
import Thermometer from './Thermometer';
import Kettle from './Kettle';
import { actionCreator } from './Thermometer/action';
import { connect } from 'react-redux';
import { thermometerSaga } from './Thermometer/saga';

import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart
} from 'react-native-chart-kit';

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
		if (!firebase.apps.length) {
			firebase.initializeApp(config);
		}

		this._interval = setInterval(() => {
			this.countdownMinus();
		}, 1000);
		//this.scanAndConnect();
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
		this.scanAndConnectSaga();
	};

	grandPerrmistions = () => {
		console.log('Scanning: Checking permissions...');

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

	render() {
		return (
			<Container>
				<ScrollView>
					<Header />
					<Thermometer
						colors={this.state.colors}
						grandPerrmistions={this.grandPerrmistions}
						manager={this.manager}
					/>
					{/* <Grid>
						<Col style={{ backgroundColor: this.state.colors[1], height: 200 }}>
							{this.props.temperature.length > 0 && (
								<Button onPress={() => this.props.scan(this.manager)} title="SCAN" />
							)}
						</Col>
						<Col style={{ backgroundColor: this.state.colors[4], height: 200 }}>
							<Text style={{ fontSize: 15, color: '#FFF' }}>
								{this.state.countdown} - {this.state.acctual}
							</Text>
						</Col>
					</Grid> */}
					{/* <Kettle colors={this.state.colors} manager={this.manager} /> */}
					<Grid>
						<Col style={{ backgroundColor: 'black', height: 255 }}>
						{this.props.temperature.length > 0 && <View>
								<Text>Wykres temperatury</Text>
								<LineChart
									data={{
										labels: [  ],
										datasets: [
											{
												data: [ 0,
													...this.props.temperature
												]
											}
										]
									}}
									width={Dimensions.get('window').width} // from react-native
									height={220}
									yAxisLabel={''}
									chartConfig={{
										backgroundColor: '#000',
										backgroundGradientFrom: '#fb8c00',
										backgroundGradientTo: '#ffa726',
										decimalPlaces: 2, // optional, defaults to 2dp
										color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
										labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
										style: {
											borderRadius: 16
										},
										propsForDots: {
											r: '6',
											strokeWidth: '2',
											stroke: '#ffa726'
										}
									}}
									bezier
									style={{
										marginVertical: 8,
										borderRadius: 16
									}}
								/>
							</View>}
						</Col>
					</Grid>
					<Grid>
						<Col style={{ backgroundColor: 'black', height: 151 }}>
							<ScrollView
								ref={(ref) => (this.scrollView = ref)}
								onContentSizeChange={(contentWidth, contentHeight) => {
									this.scrollView.scrollToEnd({ animated: true });
								}}
							>
								{this.props.log.map((log, key) => (
									<Text key={key} style={{ color: '#00FF41' }}>
										{log}
									</Text>
								))}
							</ScrollView>
						</Col>
					</Grid>
				</ScrollView>
			</Container>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	connect: (manager) => dispatch(actionCreator.connect(manager)),
	scan: (manager) => dispatch(actionCreator.scan(manager))
});

export default connect(
	(state) => ({
		temperature: state.thermometer.temperature,
		log: state.log.log
	}),
	mapDispatchToProps
)(SmartHome);

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		textAlignVertical: 'center'
	}
});
