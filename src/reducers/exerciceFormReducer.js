import {
	SET_FIELD,
	EXERCICE_SAVED_SUCCESS,
	SET_WHOLE_EXERCICE,
	RESET_FORM,
} from '../actions';

const INITIAL_STATE = {
	id: null,
	name: '',
    description: '',
    img64: '',
    repetitions: '10',
    series: '4',
}

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case SET_FIELD:
			const newState = { ...state };
			newState[action.field] = action.value;
			return newState;
		case SET_WHOLE_EXERCICE:
			return action.exercice;
		case RESET_FORM:
		case EXERCICE_SAVED_SUCCESS:
			return INITIAL_STATE;
		default:
			return state;
	}
}