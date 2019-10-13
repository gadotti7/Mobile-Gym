import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Picker,
	Slider,
	Button,
	ScrollView,
	KeyboardAvoidingView,
	ActivityIndicator,
	Alert,
	Image,
} from 'react-native';
import { connect } from 'react-redux';

import FormRow from '../components/FormRow';
import {
	setField,
	saveWorkout,
	setWholeWorkout,
	resetForm,
} from '../actions';

import { Permissions, ImagePicker } from 'expo';

class WorkoutFormPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
		}
	}

	componentDidMount() {
		const { navigation, setWholeWorkout, resetForm } = this.props;
		const { params } = navigation.state;
		if (params && params.workoutToEdit) {
			return setWholeWorkout(params.workoutToEdit);
		}
		return resetForm();
	}

	renderButton() {
		if (this.state.isLoading) {
			return <ActivityIndicator />;
		}

		return (
			<Button
				title="Salvar"
				onPress={async () => {
					this.setState({ isLoading: true });
					try {
						const { saveWorkout, workoutForm, navigation } = this.props;
						await saveWorkout(workoutForm);
						navigation.goBack();
					} catch (error) {
						Alert.alert('Erro!', error.message);
					} finally {
						this.setState({ isLoading: false });
					}
				}} />
			);
	}

	async pickImage() {
		/* Para câmera:
		const { status } = await Permissions.askAsync(
			Permissions.CAMERA_ROLL,
			Permissions.CAMERA
		); */
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		if (status !== 'granted') {
			Alert.alert('Você precisa permitir o acesso!');
			return;
		}

		/* Para câmera:
		const result = await ImagePicker.launchCameraAsync({
			quality: 0.2,
			base64: true,
			allowsEditing: true,
			aspect: [1, 1], // Android only
		}); */
		const result = await ImagePicker.launchImageLibraryAsync({
			quality: 0.2,
			base64: true,
			allowsEditing: true,
			aspect: [1, 1], // Android only
		});

		if (!result.cancelled) {
			this.props.setField('img64', result.base64);
		}
	}

	render() {
		const {
			workoutForm,
			setField,
			saveWorkout,
			navigation
		} = this.props;

		return (
			<KeyboardAvoidingView
				keyboardVerticalOffset={150}
				behavior="padding"
				enabled>
				<ScrollView>
					<FormRow first>
						<TextInput
							style={styles.input}
							placeholder="Título"
							value={workoutForm.title}
							onChangeText={value => setField('title', value)}
						 />
					</FormRow>

					<FormRow>
						{ workoutForm.img64
							? <Image
								source={{
									uri: `data:image/jpeg;base64,${workoutForm.img64}`
								}}
								style={styles.img} />
							: null }

						<Button
							title="Selecione uma imagem"
							onPress={() => this.pickImage()} />
					</FormRow>

					<FormRow>
						<Picker
							selectedValue={workoutForm.gender}
							onValueChange={itemValue => setField('gender', itemValue)}>

							<Picker.Item label="Policial" value="Policial" />
							<Picker.Item label="Comédia" value="Comédia" />
							<Picker.Item label="Terror" value="Terror" />
						</Picker>
					</FormRow>

					<FormRow>
						<View style={styles.sameRow}>
							<Text>Nota:</Text>
							<Text>{workoutForm.rate}</Text>
						</View>
						<Slider
							onValueChange={value => setField('rate', value)}
							value={workoutForm.rate}
							minimumValue={0}
							maximumValue={100}
							step={5} />
					</FormRow>

					<FormRow>
						<TextInput
							style={styles.input}
							placeholder="Descrição"
							value={workoutForm.description}
							onChangeText={value => setField('description', value)}
							numberOfLines={4}
							multiline={true}
						 />
					</FormRow>
					{ this.renderButton() }
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}


const styles = StyleSheet.create({
	input: {
		paddingLeft: 5,
		paddingRight: 5,
		paddingBottom: 5,
	},
	sameRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 10,
	},
	img: {
		aspectRatio: 1,
		width: '100%',
	}
});

function mapStateToProps(state) {
	return {
		workoutForm: state.workoutForm
	}
}

const mapDispatchToProps = {
	setField,
	saveWorkout,
	setWholeWorkout,
	resetForm,
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutFormPage);