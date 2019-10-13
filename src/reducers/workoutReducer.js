import { SET_WORKOUT } from '../actions';

export default function(state = null, action) {
	switch (action.type) {
		case SET_WORKOUT:
			return action.workout;
		default:
			return state;
	}
}