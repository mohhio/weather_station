import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { actionCreator } from './action';
import { connect } from 'react-redux';
import { styles } from './../SmartHome';
class Thermometer extends React.Component {
	render() {
		return (
			<Grid>
				<Col style={{ backgroundColor: this.props.colors[0], height: 200, width: 200 }}>
					<View style={styles.container}>
						<Text style={{ fontSize: 30, color: '#FFF' }}>
								{/* <IconFontMC name="thermometer" size={50} /> */}
								{this.props.temperature.length > 0 ? this.props.temperature[this.props.temperature.length - 1] +"°C" : null}
							</Text>
							<Button onPress={() => this.props.scan(this.props.manager)} title="SCAN" />
					
					</View>
				</Col>
				<Col style={{ backgroundColor: this.props.colors[2], height: 200 }}>
					<View style={styles.container}>
						{this.props.humidity.length > 0 ? (
							<Text style={{ fontSize: 30, color: '#FFF' }}>
								{/* <IconFontMC name="water" size={50} /> */}
								{this.props.humidity[this.props.humidity.length - 1]} %
							</Text>
						) : (
							<Button onPress={() => this.props.grandPerrmistions()} title="Pozwolenia" />
						)}
					</View>
				</Col>
			</Grid>
		);
	}
}

// const mapStateToProps = state => ({
//     photoFirebaseId: state.addAuction.photoFirebaseId
// })

const mapDispatchToProps = (dispatch) => ({
	connect: (manager) => dispatch(actionCreator.connect(manager)),
	scan: (manager) => dispatch(actionCreator.scan(manager))
});

export default connect(
	(state) => ({
		temperature: state.thermometer.temperature,
		humidity: state.thermometer.humidity
	}),
	mapDispatchToProps
)(Thermometer);
