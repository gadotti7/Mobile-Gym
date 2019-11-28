import React from 'react';
import {
	StyleSheet,
	FlatList,
	ActivityIndicator,
	View,
} from 'react-native';

import WorkoutCard from '../../components/WorkoutCard';

import { FloatingAction } from "react-native-floating-action";

import { connect } from 'react-redux';
import { watchUser } from '../../actions';

const actions = [
	{
	  text: "Usuário",
	  icon: require("../../assests/plus.png"),
	  name: "bt_user",
	  position: 2
	},
  ];
class UserPage extends React.Component {
	componentDidMount() {
		this.props.watchUser();
	}

	render() {
		const { user, navigation } = this.props;
		if (user === null) {
			return <ActivityIndicator />;
		}

		return (
		<View style={  styles.view }>
			<FloatingAction
				color="#ff0048"
				showBackground={false}
				actions={actions}
				onPressItem={name => {
					navigation.navigate('UserForm')
				}}
			/> 
		</View>
		);
	}
}

const styles = StyleSheet.create({
	marginTop: {
		marginTop: 5,
	},
	marginBottom: {
		marginBottom: 5,
	},
	view: {
		width: '100%',
		height: '100%',
	}
})

const mapStateToProps = state => {
	const { user } = state;
	if (user === null) {
		return { user }
	}
	const keys = Object.keys(user);
	const userWithKeys = keys.map(id => {
		return { ...user[id], id }
	});
	return { user: userWithKeys };
}

export default connect(
	mapStateToProps,
	{ watchUser }
)(UserPage);