import React from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { watchWorkoutUser } from '../../actions';
import { FloatingAction } from "react-native-floating-action";

import WorkoutCard from '../../components/WorkoutCard';

import { Card,Title} from "./styles";

const actions = [
	{
	  text: "Treino",
	  icon: require("../../assests/plus.png"),
	  name: "bt_workout",
	  position: 1
	},
  ];

class UserDetailPage extends React.Component {
	componentDidMount() {
		const { navigation } = this.props;
		const { user } = navigation.state.params;
		this.props.watchWorkoutUser(user);
	}

	render() {
		const { navigation } = this.props;
		const { user } = navigation.state.params;
	
		const { workout } = this.props;
		if (workout === null) {
			return <ActivityIndicator />;
		}
		return (
			<View style={  styles.view }>
				<Card>
					<Title>{user.name}</Title>
				</Card>

				<FlatList
					data={[...workout]}
					renderItem={({ item }) => (
						<WorkoutCard
							workout={item}
								onPress={() => navigation.navigate('WorkoutDetailAdm', { workout: item, user })}
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
						this.props.navigation.navigate('WorkoutForm', user);
					}}
				/>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	marginTop: {
		marginTop: 5,
	},
	marginBottom: {
		marginBottom: 5,
	},
	view: {
		width: '100%',
		height: '100%',
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

export default connect(mapStateToProps, { watchWorkoutUser }) (UserDetailPage);