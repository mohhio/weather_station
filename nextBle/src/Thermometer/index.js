import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import {actionCreator} from './action';
import { connect } from "react-redux";

class Thermometer extends React.Component {
	render() {
		return (
			<Grid>
				<Col style={{ backgroundColor: '#4CAF50', height: 200 }} onPress={this.props.connect}>
					<Text>1</Text>
				</Col>
				<Col style={{ backgroundColor: '#FFEB3B', height: 200 }}>
					<Text>2</Text>
				</Col>
			</Grid>
		);
	}
}

// const mapStateToProps = state => ({
//     photoFirebaseId: state.addAuction.photoFirebaseId
// })

const mapDispatchToProps = dispatch => ({
    connect: () => dispatch(actionCreator.connect()),
});

export default connect(
    null,
    mapDispatchToProps
)(Thermometer);

