import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { actionCreator } from './action';
import { connect } from 'react-redux';
import { styles } from './../SmartHome';
class Kettle extends React.Component {
	render() {
		return (
			<Grid>
				<Col style={{ backgroundColor: this.props.colors[5], height: 200, width: 200 }}>
					<View style={styles.container}>
							<Button onPress={() => this.props.scan(this.props.manager)} title="Szukaj czajnika" />
					</View>
				</Col>
			</Grid>
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
		humidity: state.thermometer.humidity
	}),
	mapDispatchToProps
)(Kettle);
