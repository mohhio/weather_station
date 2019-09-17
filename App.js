import React from "react";
import SmartHome from './src/SmartHome';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import configStore, { sagaMiddleware } from './store';
import initSagas from './initSagas'; 

const store = configStore();

initSagas(sagaMiddleware);

export default class App extends React.Component {
  
	constructor() {
	  super();
	//   this.state = { loading: true };
	}
  
	// async componentWillMount() {
	//   await Expo.Font.loadAsync({
	// 	Roboto: require("native-base/Fonts/Roboto.ttf"),
	// 	Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
	// 	Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
	//   });
	//   this.setState({ loading: false });
	// }
  
	render() {
	  return (
		
		<Provider store={store}>
		  <Root>
		  <SmartHome />
		  </Root>
		</Provider>
	  );
	}
  }


