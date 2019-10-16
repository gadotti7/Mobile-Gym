import React from 'react';
import {
	StyleSheet,
	ActivityIndicator,
	Alert,
	TextInput,
	Button,
	KeyboardAvoidingView,
} from 'react-native';

import firebase from 'firebase';
import { connect } from 'react-redux';

import { plus } from "../../assests/plus.png";
import { tryLogin } from '../../actions';
import {  Container, Logo, Card, Login, Password, ButtonView, ContainerForm} from "./styles";

class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mail: '',
			password: '',
			isLoading: false,
			message: ''
		}
	}

	componentDidMount() {
		const config = {
			apiKey: "AIzaSyC7-NymNx8b6ud51UcGCxhofzRLPOi6xsY",
            authDomain: "mobilegym-55357.firebaseapp.com",
            databaseURL: "https://mobilegym-55357.firebaseio.com",
            projectId: "mobilegym-55357",
            storageBucket: "",
            messagingSenderId: "865300766780",
            appId: "1:865300766780:web:24150d9e264a568f7d2339"
		};
		firebase.initializeApp(config);
	}

	onChangeHandler(field, value) {
		this.setState({
			[field]: value
		});
	}

	tryLogin() {
		this.setState({ isLoading: true, message: '' });
		const { email, password } = this.state;
		console.log(email)
		this.props.tryLogin({ email, password })
			.then(user => {
				if (user)
					return this.props.navigation.replace('Main');

				this.setState({
					isLoading: false,
					message: ''
				});
			})
			.catch(error => {
				this.setState({
					isLoading: false,
					message: this.getMessageByErrorCode(error.code)
				});
			});
	}

	getMessageByErrorCode(errorCode) {
		switch(errorCode){
            case 'auth/wrong-password':
                return Alert.alert(
                    'Login inválido',
                        'Usuário/Senha inválido!');
            case 'auth/user-not-found':
                return Alert.alert(
                    'Login inválido',
                        'Usuário não encontrado!');
            case 'auth/invalid-email':
                return Alert.alert(
                    'Login inválido',
                        'E-mail inserido é inválido!');
            case 'auth/user-disabled':
                return Alert.alert(
                    'Login inválido',
                        'Usuário desabilitado!');
            default:
                return Alert.alert(
                    'Login inválido',
                        'Erro desconhecido, favor entrar em contato com o administrador!');
        }
	}

	renderButton() {
		if (this.state.isLoading)
			return <ActivityIndicator />;
		return (
			<Button style={styles.button}
				title="Entrar"
				color= '#ff0048'
				onPress={() => this.tryLogin()}/>
		);
	}

	render() {
		return (
			<KeyboardAvoidingView
				keyboardVerticalOffset={1}
				behavior="padding"
				enabled>
				<Container>
					<Logo 	source={require('../../assests/mobileGym.png') }/>
					
					<Card>
						<ContainerForm>
							<Login>
								<TextInput style={  styles.input }
									placeholder="user@email.com" 
									value={this.state.email}  
									onChangeText={ value => this.onChangeHandler('email',value)}
									keyboardType="email-address"
									autoCapitalize="none"
								/>
							</Login>
						
							<Password>
								<TextInput style={styles.input}
									placeholder="*******"
									secureTextEntry
									value={this.state.password}
									onChangeText={ value => this.onChangeHandler('password',value)}
								/>
							</Password>

						</ContainerForm>
						<ButtonView>
							{ this.renderButton() }
						</ButtonView>
					</Card>
				</Container>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	input: {
		paddingLeft: 10,
		paddingRight: 5,
		paddingBottom: 5,
		borderRadius: 20,
	},
});


export default connect(null, { tryLogin })(LoginPage)