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
			.ref(`/users/${currentUser.uid}/workout`)
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

export const deleteSerie = workout => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			Alert.alert(
				'Deletar',
				`Deseja deletar a workout ${workout.title}`,
				[{
					text: 'Não',
					onPress: () => {
						resolve(false);
					},
					style: 'cancel' // IOS
				},{
					text: 'Sim',
					onPress: async () => {
						const { currentUser } = firebase.auth();
						try {
							await firebase
								.database()
								.ref(`/users/${currentUser.uid}/workout/${workout.id}`)
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