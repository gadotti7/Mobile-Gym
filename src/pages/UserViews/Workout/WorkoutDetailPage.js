import React from 'react';

import { connect } from 'react-redux';
import { deleteWorkout } from '../../../actions';

import { Container,Card,Title,Description} from "./styles";

class WorkoutDetailPage extends React.Component {
	render() {
		const { navigation } = this.props;
		const { workout } = navigation.state.params;

		return (
			<Container>
				<Card>
					<Title>{workout.name}</Title>
					<Description>{workout.details} </Description>
				</Card>
			</Container>
		)
	}
}

export default connect(null, { deleteWorkout })(WorkoutDetailPage);