import React from 'react';
import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	Image,
	Button,
} from 'react-native';

import { connect } from 'react-redux';
import { deleteWorkout } from '../actions';

import Line from '../components/Line';
import LongText from '../components/LongText';

class WorkoutDetailPage extends React.Component {
	render() {
		const { navigation } = this.props;
		const { workout } = navigation.state.params;

		return (
			<ScrollView>
				{
					workout.img64
						?  <Image
							style={styles.image}
							source={{
								uri: `data:image/jpeg;base64,${workout.img64}`
							}} />
						: null
				}
				<Line label="Título" content={workout.title} />
				<Line label="Gênero" content={workout.gender} />
				<Line label="Nota" content={workout.rate} />
				<LongText label="Descrição" content={workout.description} />

				<View style={styles.button}>
					<Button
						title="Editar"
						onPress={() => {
							navigation.replace('WorkoutForm', { workoutToEdit: workout })
						}} />
				</View>

				<View style={styles.button}>
					<Button
						title="Deletar"
						color="#FF0004FF"
						onPress={async () => {
							const hasDeleted = await this.props.deleteWorkout(workout);
							if (hasDeleted) {
								navigation.goBack();
							}
						}} />
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	image: {
		aspectRatio: 1
	},
	button: {
		margin: 10
	}
});

export default connect(null, { deleteWorkout })(WorkoutDetailPage);