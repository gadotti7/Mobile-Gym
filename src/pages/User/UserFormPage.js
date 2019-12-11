import React from 'react';
import {
	StyleSheet,
	TextInput,
	Picker,
	Button,
	ScrollView,
	KeyboardAvoidingView,
	ActivityIndicator,
	Alert,
	Image,
} from 'react-native';
import { connect } from 'react-redux';

import FormRow from '../../components/FormRow';
import {
	setField,
	saveUser,
	setWholeUser,
	resetForm,
} from '../../actions';

import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

class UserFormPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
		}
	}

	componentDidMount() {
		const { navigation, setWholeUser, resetForm } = this.props;
		const { params } = navigation.state;
		if (params && params.userToEdit) {
			return setWholeUser(params.userToEdit);
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
						const { saveUser, userForm, navigation } = this.props; 
						await  saveUser(userForm);
						this.setState({ isLoading: false });
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
			userForm,
			setField,
			saveUser,
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
                            placeholder="Nome Completo" 
                            value={userForm.name}
                            onChangeText={value => setField('name', value)}
                        />
                    </FormRow>
                
                    {/* Details */}
                    <FormRow>
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail" 
                            value={userForm.email}
							onChangeText={value => setField('email', value)}
							keyboardType="email-address"
							autoCapitalize="none"
                        />
                    </FormRow>

					<FormRow>
                        <TextInput
							style={styles.input}
							placeholder="Senha"
							secureTextEntry
                            value={userForm.password}
                            onChangeText={value => setField('password', value)}

                        />
                    </FormRow>

					<FormRow>
						{ userForm.img64
							? <Image
								source={{
									uri: `data:image/jpeg;base64,${userForm.img64}`
								}}
								style={styles.img} />
							: null }

						<Button
							title="Selecione uma imagem"
							onPress={() => this.pickImage()} />
					</FormRow>

                    {/* COMBO */}
                    <FormRow last>
                        <Picker
                            selectedValue={userForm.userType}
                            onValueChange={ itemValue => {
                                setField('userType', itemValue)
                            }}>
        
                            <Picker.Item label="Aluno"        value="Aluno" />
                            <Picker.Item label="Funcionário"       value="Funcionário" />

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
		userForm: state.userForm
	}
}

const mapDispatchToProps = {
	setField,
	saveUser,
	setWholeUser,
	resetForm,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFormPage);