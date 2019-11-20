import { SET_USER } from '../actions';

export default function(state = null, action) {
	switch (action.type) {
		case SET_USER:
			return action.user;
		default:
			return state;
	}
}