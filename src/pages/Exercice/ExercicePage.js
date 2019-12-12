import React from 'react';
import { Image } from 'react-native';

import { connect } from 'react-redux';
import { deleteWorkout } from '../../actions';

import { Container,Card,CardImage,Title,Description,Repetitions,Serie} from "./styles";

class WorkoutDetailPage extends React.Component {
	render() {
		const { navigation } = this.props;
		const { exercice } = navigation.state.params;

		return (
			<Container>

				<CardImage>
					{
						exercice.img64
						? <Image
							source={{
								uri: `data:image/jpeg;base64,${exercice.img64}`
							}}
							aspectRatio={1}
							resizeMode="stretch"
						/>
						: <Image
							style={{flex: 1 ,width: null, height: null}}
							source={ require('../../assests/imageWorkout.png') } 
							resizeMode="stretch"
						/>
					}
				</CardImage>

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