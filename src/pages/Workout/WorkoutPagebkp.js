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