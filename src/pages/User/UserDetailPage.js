import React from 'react';
import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	Image,
	Button,
} from 'react-native';

import { FloatingAction } from "react-native-floating-action";

import { connect } from 'react-redux';
import { deleteUser } from '../../actions';

import { Card,Title,Description} from "./styles";

class UserDetailPage extends React.Component {
	render() {
		const { navigation } = this.props;
		const { user } = navigation.state.params;

		return (
			<ScrollView>
				
				<Card>
					<Title>{user.name}</Title>
					<Description>{user.details} </Description>
					<FloatingAction
						color="#ff0048"
						showBackground={false}
					/> 

				</Card>


				{/* <Line label="Nome" content={user.name} />
				<LongText label="Detalhes" content={user.details} />
				<Line label="Grupo Muscular" content={user.muscleGroup} /> */}

				{/* <View style={styles.button}>
					<Button
						title="Editar"
						onPress={() => {
							navigation.replace('userForm', { userToEdit: user })
						}} />
				</View> */}

				{/* <View style={styles.button}>
					<Button
						title="Deletar"
						color="#FF0004FF"
						onPress={async () => {
							const hasDeleted = await this.props.deleteUser(user);
							if (hasDeleted) {
								navigation.goBack();
							}
						}} />
				</View> */}
			</ScrollView>
		)
	}
}

export default connect(null, { deleteUser })(UserDetailPage);