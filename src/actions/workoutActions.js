import firebase from 'firebase';
import { Alert } from 'react-native';

export const SET_WORKOUT = 'SET_WORKOUT';
const setWorkout = workout => ({
	type: SET_WORKOUT,
	workout,
});

export const watchWorkout = () => {
	const { currentUser } = firebase.auth();
	return dispatch => {
		firebase
			.database()
			.ref(`/users/${currentUser.uid}/workouts`)
			.on('value', snapshot => {
				const workout = snapshot.val();

				if (!workout) {
					return dispatch(setWorkout({}))
				}

				const action = setWorkout(workout);
				dispatch(action)
			});
	}
}

export const watchWorkoutUser = ( user ) => {
	return dispatch => {
		firebase
			.database()
			.ref(`/users/${user.id}/workouts`)
			.on('value', snapshot => {
				const workout = snapshot.val();

				if (!workout) {
					return dispatch(setWorkout({}))
				}

				const action = setWorkout(workout);
				dispatch(action)
			});
	}
}

export const deleteWorkout = workout => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			Alert.alert(
				'Deletar',
				`Deseja deletar a workout ${workout.name}`,
				[{
					text: 'Não',
					onPress: () => {
						resolve(false);
					},
					style: 'cancel' // IOS
				},{
					text: 'Sim',
					onPress: async () => {
						try {
							await firebase
								.database()
								.ref(`/users/${currentUser.uid}/workouts/${workout.id}`)
								.remove();
							resolve(true);
						} catch(e) {
							reject(e);
						}
					},
				}],
				{ cancelable: false }
			)
		})
	}
}