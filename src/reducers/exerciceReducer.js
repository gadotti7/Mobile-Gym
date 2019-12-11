import { SET_EXERCICE } from '../actions';

export default function(state = null, action) {
	switch (action.type) {
		case SET_EXERCICE:
			return action.exercice;
		default:
			return state;
	}
}