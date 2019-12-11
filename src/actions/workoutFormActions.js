import firebase from 'firebase';

export const SET_WHOLE_WORKOUT = 'SET_WHOLE_WORKOUT';
export const setWholeWorkout = workout => ({
	type: SET_WHOLE_WORKOUT,
	workout
});

export const SET_FIELD = 'SET_FIELD';
export const setField = (field, value) => {
	return {
		type: SET_FIELD,
		field,
		value,
	}
}

export const WORKOUT_SAVED_SUCCESS = 'WORKOUT_SAVED_SUCCESS';
const workoutSavedSuccess = () => ({
	type: WORKOUT_SAVED_SUCCESS
});

export const RESET_FORM = 'RESET_FORM';
export const resetForm = () => ({
	type: RESET_FORM
});

export const saveWorkout = (workout, userID) => {
	return async dispatch => {
		const db = firebase.database();
		if (workout.id) {
			await db.ref(`/users/${userID}/workouts/${workout.id}`)
				.set(workout);
		} else {
			await db.ref(`/users/${userID}/workouts`)
				.push(workout);
		}
		dispatch(workoutSavedSuccess())
	}
}
