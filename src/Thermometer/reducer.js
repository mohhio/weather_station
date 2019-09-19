import { PUT_TEMPERATURE, PUT_HUMIDITY } from './action';

const initiaState = {
  temperature: [],
  humidity: []
};

export function reducer(state = initiaState, action) {
	switch (action.type) {
		case PUT_TEMPERATURE:
        return {
          ...state,
          temperature: [...temperature, action.payload]
      };
			
		case PUT_HUMIDITY:
        return {
          ...state,
          humidity: [...humidity, action.payload]
      };
			break;
		default:
			return state;
	}
}

export default reducer;
