import {
	SET_FIELD,
	WORKOUT_SAVED_SUCCESS,
	SET_WHOLE_WORKOUT,
	RESET_FORM,
} from '../actions';

const INITIAL_STATE = {
	id: null,
	name: '',
	details: '',
	muscleGroup: 'Peito',
	exercices: '',
}

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case SET_FIELD:
			const newState = { ...state };
			newState[action.field] = action.value;
			return newState;
		case SET_WHOLE_WORKOUT:
			return action.workout;
		case RESET_FORM:
		case WORKOUT_SAVED_SUCCESS:
			return INITIAL_STATE;
		default:
			return state;
	}
}