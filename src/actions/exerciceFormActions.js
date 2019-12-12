import firebase from 'firebase';

export const SET_WHOLE_EXERCICE = 'SET_WHOLE_EXERCICE';
export const setWholeExercice = exercice => ({
	type: SET_WHOLE_EXERCICE,
	exercice
});


export const EXERCICE_SAVED_SUCCESS = 'EXERCICE_SAVED_SUCCESS';
const exerciceSavedSuccess = () => ({
	type: EXERCICE_SAVED_SUCCESS
});

export const saveExercice = (exercice,userID,workoutID) => {
	return async dispatch => {
		const db = firebase.database();
		if (exercice.id) {
			await db.ref(`/users/${userID}/workouts/${workoutID}/exercices/${exercice.id}`)
				.set(exercice);
		} else {
			await db.ref(`/users/${userID}/workouts/${workoutID}/exercices/`)
				.push(exercice);
		}
		dispatch(exerciceSavedSuccess())
	}
}
