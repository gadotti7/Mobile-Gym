import firebase from 'firebase';
import { Alert } from 'react-native';

export const SET_USER = 'SET_USER';
const setUser = user => ({
	type: SET_USER,
	user,
});

export const watchUser = () => {
	const { currentUser } = firebase.auth();
	return dispatch => {
		firebase
			.database()
			.ref(`/users/${currentUser.uid}/user`)
			.on('value', snapshot => {
				const user = snapshot.val();

				if (!user) {
					return dispatch(setUser({}))
				}

				const action = setUser(user);
				dispatch(action)
			});
	}
}

export const deleteUser = user => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			Alert.alert(
				'Deletar',
				`Deseja deletar a user ${user.name}`,
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
								.ref(`/users/${currentUser.uid}/users/${user.id}`)
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