import firebase from 'firebase';

export const SET_WHOLE_USER = 'SET_WHOLE_USER';
export const setWholeWorkout = user => ({
	type: SET_WHOLE_USER,
	user
});

export const SET_FIELD = 'SET_FIELD';
export const setField = (field, value) => {
	return {
		type: SET_FIELD,
		field,
		value,
	}
}

export const USER_SAVED_SUCCESS = 'USER_SAVED_SUCCESS';
const userSavedSuccess = () => ({
	type: USER_SAVED_SUCCESS
});

export const RESET_FORM = 'RESET_FORM';
export const resetForm = () => ({
	type: RESET_FORM
});

export const saveUser = user => {
	const { currentUser } = firebase.auth();
	return async dispatch => {
		const db = firebase.database();
		if (user.id) {
			await db.ref(`/users/${currentUser.uid}/users/${user.id}`)
				.set(user);
		} else {
			await db.ref(`/users/${currentUser.uid}/users`)
				.push(user);
		}
		dispatch(userSavedSuccess())
	}
}