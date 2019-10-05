const initiaState = null;
import { PUT_DEVICE } from './action';

export function reducer(state = initiaState, action) {
	switch (action.type) {
		case PUT_DEVICE: {
			return {
				...state,
				device: action.payload
			};
		}
		default:
			return state;
	}
}

export default reducer;
