import React from 'react';
import {
	StyleSheet,
	FlatList,
	ActivityIndicator,
	View,
} from 'react-native';

import WorkoutCard from '../../components/WorkoutCard';

import { FloatingAction } from "react-native-floating-action";

import { connect } from 'react-redux';
import { watchWorkout } from '../../actions';

const actions = [
	{
	  text: "Treino",
	  icon: require("../../assests/plus.png"),
	  name: "bt_workout",
	  position: 2
	},
	{
		text: "Usuários",
		icon: require("../../assests/plus.png"),
		name: "bt_users",
		position: 3
	  },
  ];
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
				data={[...workout]}
				renderItem={({ item, index }) => (
					<WorkoutCard
						workout={item}
							onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}
							// TODO colocar pra excluir 
							//onLongPress={() => navigation.navigate('WorkoutDetail', { workout: item })}
						/>
				)}
				keyExtractor={item => item.id}
				numColumns={2}
				ListHeaderComponent={props => (<View style={styles.marginTop} />)}
				ListFooterComponent={props => (<View style={styles.marginBottom} />)}
			/>

			<FloatingAction
				color="#ff0048"
				showBackground={false}
				actions={actions}
				onPressItem={name => {
					console.log(name)
					if  (name === 'bt_workout')  return navigation.navigate('WorkoutForm')
					if  (name === 'bt_users')  return navigation.navigate('User')
				}}
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