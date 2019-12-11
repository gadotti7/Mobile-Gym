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

import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

import FormRow from '../../components/FormRow';
import {
	setField,
	saveExercice,
	setWholeExercice,
	resetForm,
} from './../../actions';

class ExerciceFormPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
		}
	}

	componentDidMount() {
		const { navigation, setWholeExercice, resetForm } = this.props;
		const { params } = navigation.state;
		if (params && params.exerciceToEdit) {
			return setWholeExercice(params.exerciceToEdit);
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
						const { saveExercice, exerciceForm, navigation } = this.props;
						const params = this.props.navigation.state.params;
						await saveExercice( exerciceForm, params.user.id, params.workout.id);
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
		const { status } = await Permissions.askAsync(
			Permissions.CAMERA_ROLL,
			Permissions.CAMERA
		);

		if (status !== 'granted') {
			Alert.alert('Você precisa permitir o acesso!');
			return;
		}

		const result = await ImagePicker.launchCameraAsync({
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
			exerciceForm,
			setField,
			saveExercice,
			navigation
		} = this.props;
		const { workout, user} = navigation.state.params;

		return (
			<KeyboardAvoidingView
				keyboardVerticalOffset={150}
				behavior="padding"
				enabled>
				<ScrollView>
					
					{/* Name */}
                    <FormRow first>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome Exercício" 
                            value={exerciceForm.name}
                            onChangeText={value => setField('name', value)}
                        />
                    </FormRow>
                
                    {/* Details */}
                    <FormRow>
                        <TextInput
                            style={styles.input}
                            placeholder="Descrição Exercício" 
                            value={exerciceForm.description}
							onChangeText={value => setField('description', value)}
                        />
                    </FormRow>

                    <FormRow>
						{ exerciceForm.img64
							? <Image
								source={{
									uri: `data:image/jpeg;base64,${exerciceForm.img64}`
								}}
								style={styles.img} />
							: null }

						<Button
							title="Selecione uma imagem"
							onPress={() => this.pickImage()} />
					</FormRow>

					<Text style={  styles.text }>Número de Repetições</Text>

                    <FormRow>
                        <Picker
                            selectedValue={exerciceForm.repetitions}
                            onValueChange={ itemValue => {
                                setField('repetitions', itemValue)
                            }}>
        
                            <Picker.Item label="1"        value="1" />
                            <Picker.Item label="2"       value="2" />
                            <Picker.Item label="3"       value="3" />
                            <Picker.Item label="4"       value="4" />
                            <Picker.Item label="5"       value="5" />
                            <Picker.Item label="6"       value="6" />
                            <Picker.Item label="7"       value="7" />
                            <Picker.Item label="8"       value="8" />
                            <Picker.Item label="9"       value="9" />
                            <Picker.Item label="10"       value="10" />
                            <Picker.Item label="11"       value="11" />
                            <Picker.Item label="12"       value="12" />
                            <Picker.Item label="13"       value="13" />
                            <Picker.Item label="14"       value="14" />
                            <Picker.Item label="15"       value="15" />
                            <Picker.Item label="16"       value="16" />

                        </Picker>
                    </FormRow>

					<Text  style={  styles.text }>Número de Séries</Text>

			        {/* COMBO */}
                    <FormRow last>
                        <Picker
                            selectedValue={exerciceForm.series}
                            onValueChange={ itemValue => {
                                setField('series', itemValue)
                            }}>
        
                            <Picker.Item label="1"        value="1" />
                            <Picker.Item label="2"       value="2" />
                            <Picker.Item label="3"       value="3" />
                            <Picker.Item label="4"       value="4" />
                            <Picker.Item label="5"       value="5" />
                            <Picker.Item label="6"       value="6" />

                        </Picker>
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
	text: {
		paddingLeft: 10,
		paddingTop: 10,
		paddingBottom: 10,
	}
});

function mapStateToProps(state) {
	return {
		exerciceForm: state.exerciceForm
	}
}

const mapDispatchToProps = {
	setField,
	saveExercice,
	setWholeExercice,
	resetForm,
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciceFormPage);