import firebase from 'firebase';

export const SET_EXERCICE = 'SET_EXERCICE';
const setExercice = exercice => ({
	type: SET_EXERCICE,
	exercice,
});

export const watchExerciceUser = ( userID) => {
	return dispatch => {
		firebase
			.database()
			.ref(`/users/${userID}/exercices`)
			.on('value', snapshot => {
				const exercice = snapshot.val();
				if (!exercice) {
					return dispatch(setExercice({}))
				}

				const action = setExercice(exercice);
				dispatch(action)
			});
	}
}