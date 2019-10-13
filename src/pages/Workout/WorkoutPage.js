import React from 'react';
import {
	StyleSheet,
	View,
	FlatList,
	ActivityIndicator,
} from 'react-native';

import WorkoutCard from '../../components/WorkoutCard';
import AddWorkoutCard from '../../components/AddWorkoutCard';
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
			<View>
				<FlatList
					data={[...workout, { isLast: true }]}
					keyExtractor={item => String(item.id)}
					renderItem={({ item }) => (
						item.isLast
							? <AddWorkoutCard
								onPress={() => navigation.navigate('WorkoutForm')} />
							: <WorkoutCard
								workout={item}
								onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}
							/>
					)}
					ListHeaderComponent={props => (<View style={styles.marginTop} />)}
					ListFooterComponent={props => (<View style={styles.marginBottom} />)}
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