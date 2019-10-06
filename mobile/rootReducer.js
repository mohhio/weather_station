import { combineReducers } from 'redux';
import kettleReducer from './src/Kettle/reducer';
import thermometerReducer from './src/Thermometer/reducer';
import logReducer from './src/Log/reducer';
export default combineReducers({
	kettle: kettleReducer,
	thermometer: thermometerReducer,
	vacuumCleaner: null,
	log: logReducer,
});
