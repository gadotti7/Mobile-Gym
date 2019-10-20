import {
	SET_FIELD,
	USER_SAVED_SUCCESS,
	SET_WHOLE_USER,
	RESET_FORM,
} from '../actions';

const INITIAL_STATE = {
	id: null,
	name: '',
    email: '',
    password: '',
    img64: '',
	userType: 'Aluno',
}

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case SET_FIELD:
			const newState = { ...state };
			newState[action.field] = action.value;
			return newState;
		case SET_WHOLE_USER:
			return action.workout;
		case RESET_FORM:
		case USER_SAVED_SUCCESS:
			return INITIAL_STATE;
		default:
			return state;
	}
}