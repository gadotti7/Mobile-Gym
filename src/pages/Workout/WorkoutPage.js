import React from 'react';
import {
	StyleSheet,
	FlatList,
	ActivityIndicator,
} from 'react-native';

import { Container, Post, Header, ImageWorkout, Name, Description } from "./styles";
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
		<FlatList
			key="list"
			data={[...workout]}
			keyExtractor={item => String(item.id)}
			renderItem={({ item }) => (
			<Post onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}>
				<Header>
				<Name>{item.name}</Name>
				</Header>

				<ImageWorkout source={ require('../../assests/workoutImage.jpeg') } />
	
				<Description>
					{item.details}
				</Description>
			</Post>
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