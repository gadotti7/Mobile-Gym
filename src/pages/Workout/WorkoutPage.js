import React from 'react';
import {
	StyleSheet,
	FlatList,
	ActivityIndicator,
	View,
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

import WorkoutCard from '../../components/WorkoutCard';
import AddWorkoutCard from '../../components/AddWorkoutCard';

import { FloatingAction } from "react-native-floating-action";

import { connect } from 'react-redux';
import { watchWorkout } from '../../actions';

const isEven = number => number % 2 === 0;

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
		<View>
			<FlatList
				data={[...workout, { isLast: true }]}
				renderItem={({ item, index }) => (
					<WorkoutCard
						workout={item}
							isFirstColumn={isEven(index)}
							onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}
						/>
				)}
				keyExtractor={item => item.id}
				numColumns={2}
				ListHeaderComponent={props => (<View style={styles.marginTop} />)}
				ListFooterComponent={props => (<View style={styles.marginBottom} />)}
			/>

			<FloatingAction
				// onPress={() => navigation.navigate('WorkoutForm')} />
			/>
		</View>
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