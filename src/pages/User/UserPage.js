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
	  text: "Treino",
	  icon: require("../../assests/plus.png"),
	  name: "bt_workout",
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
		<View>
			<FlatList
				data={[...user]}
				renderItem={({ item, index }) => (
					<WorkoutCard
                            user={item}
							onPress={() => navigation.navigate('UserDetail', { user: item })}
							// TODO colocar pra excluir 
							//onLongPress={() => navigation.navigate('WorkoutDetail', { workout: item })}
						/>
				)}
				keyExtractor={item => item.id}
				numColumns={2}
				ListHeaderComponent={props => (<View style={styles.marginTop} />)}
				ListFooterComponent={props => (<View style={styles.marginBottom} />)}
			/>

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