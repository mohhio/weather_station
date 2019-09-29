import { combineReducers } from 'redux';
import kettleReducer from './src/Kettle/reducer';

export default combineReducers({
    kettle: kettleReducer,
    thermometer: null, 
    vacuumCleaner: null
})
