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
			await db.ref(`/users/`)
				.set(user);
		}
		else {
			await db.ref(`/users/`)
				.push(user);
		}
		await firebase
			.auth()
			.createUserWithEmailAndPassword(user.email, user.password)
			dispatch(userSavedSuccess())
	}
}