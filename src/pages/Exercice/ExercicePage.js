import React from 'react';
import { Image } from 'react-native';

import { connect } from 'react-redux';
import { deleteWorkout } from '../../actions';

import { Container,Card,Title,Description,Repetitions,Serie} from "./styles";

class WorkoutDetailPage extends React.Component {
	render() {
		const { navigation } = this.props;
		const { exercice } = navigation.state.params;

		return (
			<Container>
				<Card>
					<Title>{exercice.name}</Title>
					<Description>Descrição: {exercice.description} </Description>
                    <Repetitions>Repetições: {exercice.repetitions} </Repetitions>
                    <Serie>Séries: {exercice.series} </Serie>
				</Card>
			</Container>
		)
	}
}

export default connect(null, { deleteWorkout })(WorkoutDetailPage);