import firebase from 'firebase';

export const SET_WHOLE_USER = 'SET_WHOLE_USER';
export const setWholeUser = user => ({
	type: SET_WHOLE_USER,
	user,
});

export const USER_SAVED_SUCCESS = 'USER_SAVED_SUCCESS';
const userSavedSuccess = () => ({
	type: USER_SAVED_SUCCESS
});

export const saveUser = user => {
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