import { PUT_TEMPERATURE, PUT_HUMIDITY, PUT_DEVICE } from './action';

const initiaState = {
  temperature: [],
  humidity: [], 
  device: null
};

export function reducer(state = initiaState, action) {
	switch (action.type) {
		case PUT_TEMPERATURE:
      console.log('>aaaaaaaaaaaaa',action.payload);
        return {
          ...state,
          temperature: [...state.temperature, action.payload]
      };
			
		case PUT_HUMIDITY:
        return {
          ...state,
          humidity: [...state.humidity, action.payload]
      };
      break;
    case PUT_DEVICE:{
        return {
          ...state,
          device: action.payload
        }
    }
		default:
			return state;
	}
}

export default reducer;
