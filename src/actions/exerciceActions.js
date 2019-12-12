import firebase from 'firebase';
import { Alert } from 'react-native';

export const SET_EXERCICE = 'SET_EXERCICE';
const setExercice = exercice => ({
	type: SET_EXERCICE,
	exercice,
});

export const watchExerciceUser = ( workoutID ,userID ) => {
	return dispatch => {
		firebase
			.database()
			.ref(`/users/${userID}/workouts/${workoutID}/exercices`)
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

export const deleteExercice = ( workout ,user, exercice) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			Alert.alert(
				'Deletar',
				`Deseja deletar o exercício ${exercice.name}`,
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
								.ref(`/users/${user.id}/workouts/${workout.id}/exercices/${exercice.id}`)
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