import { ADD_LOG } from './action';

const initiaState = {
	log: []
};

export function reducer(state = initiaState, action) {
	switch (action.type) {
		case ADD_LOG:
			if (action.payload !== null) {
				return {
					...state,
					log: [ ...state.log, action.payload ]
				};
			}else{
                return state;
            }

		default:
			return state;
	}
}

export default reducer;
