import React from 'react';
import { StyleSheet, View, Button, ActivityIndicator, FlatList } from 'react-native';

import { connect } from 'react-redux';
import { watchExerciceUser } from '../../actions';

import { FloatingAction } from "react-native-floating-action";
import { Card,Title,Description} from "../UserViews/Workout/styles";
import ExerciceCard from "../../components/ExerciceCard";

const actions = [
	{
	  text: "Exercício",
	  icon: require("../../assests/plus.png"),
	  name: "bt_exercice",
	  position: 1
	},
  ];

class WorkoutDetailAdm extends React.Component {
	componentDidMount() {
		const { navigation } = this.props;
		const { user } = navigation.state.params
		console.log(user.id)
		this.props.watchExerciceUser(user.id);
	}

	render() {
		const { navigation } = this.props;
		const { user } = navigation.state.params
		const { workout} = navigation.state.params;
		
		const { exercice } = this.props;
		if (exercice === null) {
			return <ActivityIndicator />;
		}

		return (
			<View style={  styles.view }>
				<Card>
					<Title>{workout.name}</Title>
					<Description>{workout.details} </Description>
				</Card>

				<FlatList
					data={[...exercice]}
					renderItem={({ item }) => (
						<ExerciceCard
							exercice={item}
								onPress={() => navigation.navigate('WorkoutDetailAdm', { exercice: item, user })}
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
						this.props.navigation.navigate('ExerciceForm', {workout, user});
					}}
				/>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	image: {
		aspectRatio: 1
	},
	button: {
		margin: 10
	},
	view: {
		width: '100%',
		height: '100%',
	}
});

const mapStateToProps = state => {
	const { exercice } = state;

	if (exercice === null) {
		return { exercice }
	}
	const keys = Object.keys(exercice);
	const exerciceWithKeys = keys.map(id => {
		return { ...exercice[id], id }
	});

	return { exercice: exerciceWithKeys };
}

export default connect(mapStateToProps, { watchExerciceUser }) (WorkoutDetailAdm);