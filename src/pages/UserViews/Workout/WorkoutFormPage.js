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

import FormRow from '../../../components/FormRow';
import {
	setField,
	saveWorkout,
	setWholeWorkout,
	resetForm,
} from '../../../actions';

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
						const params = this.props.navigation.state.params;
						await saveWorkout( workoutForm, params.id );
						navigation.goBack();
					} catch (error) {
						Alert.alert('Erro!', error.message);
					} finally {
						this.setState({ isLoading: false });
					}
				}} />
			);
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
					
					{/* Name */}
                    <FormRow first>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome Treino" 
                            value={workoutForm.name}
                            onChangeText={value => setField('name', value)}
                        />
                    </FormRow>
                
                    {/* Details */}
                    <FormRow last>
                        <TextInput
                            style={styles.input}
                            placeholder="Detalhes" 
                            value={workoutForm.details}
                            onChangeText={value => setField('details', value)}
                            numberOfLines={4}
                            multiline={true}
                        />
                    </FormRow>
                
                    {/* COMBO */}
                    <FormRow last>
                        <Picker
                            selectedValue={workoutForm.muscleGroup}
                            onValueChange={ itemValue => {
                                setField('muscleGroup', itemValue)
                            }}>
        
                            <Picker.Item label="Peito"        value="Peito" />
                            <Picker.Item label="Costas"       value="Costas" />
                            <Picker.Item label="Ombro"        value="Ombro" />
                            <Picker.Item label="Biceps"       value="Biceps" />
                            <Picker.Item label="Triceps"      value="Triceps" />
                            <Picker.Item label="Antebraço"    value="Antebraço" />
                            <Picker.Item label="Abdômen"      value="Abdômen" />
                            <Picker.Item label="Quadríceps"   value="Quadríceps" />
                            <Picker.Item label="Adutores"     value="Adutores" />
                            <Picker.Item label="Abdutores"    value="Abdutores" />
                            <Picker.Item label="Glúteos"      value="Glúteos" />
                            <Picker.Item label="Posteriores"  value="Posteriores" />
                            <Picker.Item label="Panturrilhas" value="Panturrilhas" />
                            <Picker.Item label="Cardio"       value="Cardio" />
                            
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