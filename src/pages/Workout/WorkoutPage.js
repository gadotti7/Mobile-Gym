import React from 'react';
import {
	StyleSheet,
	FlatList,
	ActivityIndicator,
} from 'react-native';

import {
	Container, 
	Workout,
	Header,
	ImageWorkout,
	Name,
	Details,
	AddWorkout,
	NewWorkout,
} from "./styles";

import { connect } from 'react-redux';
import { watchWorkout } from '../../actions';

class WorkoutPage extends React.Component {
	componentDidMount() {
		this.props.watchWorkout();
	}

	render() {
		const { workout, navigation } = this.props;
		if (workout === null) {
			return <ActivityIndicator />;
		}

		return (
			<Container>
			<AddWorkout  onPress={() => navigation.navigate('WorkoutForm')}>
				<NewWorkout>Adicionar Novo Treino</NewWorkout>	
			</AddWorkout>
			<FlatList
					data={[...workout]}
					keyExtractor={item => String(item.id)}
					renderItem={({ item }) => (
					<Workout onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}>
						<Header>
						<Name>{item.name}</Name>
						</Header>

						<ImageWorkout source={ require('../../assests/workoutImage.jpeg') } />
			
						<Details>
							{item.details}
						</Details>
					</Workout>
					)}
			/>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	marginTop: {
		marginTop: 5,
	},
	marginBottom: {
		marginBottom: 5,
	}
})

const mapStateToProps = state => {
	const { workout } = state;
	if (workout === null) {
		return { workout }
	}
	const keys = Object.keys(workout);
	const workoutWithKeys = keys.map(id => {
		return { ...workout[id], id }
	});
	return { workout: workoutWithKeys };
}

export default connect(
	mapStateToProps,
	{ watchWorkout }
)(WorkoutPage);