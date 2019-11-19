import React from 'react';
import {
	StyleSheet,
	View,
	FlatList,
	ActivityIndicator,
} from 'react-native';

import { connect } from 'react-redux';
import { watchUser } from '../../actions';

const isEven = number => number % 2 === 0;

class UserPage extends React.Component {
	componentDidMount() {
		this.props.watchUser();
	}

	render() {
		const { users, navigation } = this.props;
		if (users === null) {
			return <ActivityIndicator />;
		}

		return (
			<View>
				<FlatList
					data={[...users, { isLast: true }]}
					renderItem={({ item, index }) => (
						item.isLast
							? <AddSerieCard
								isFirstColumn={isEven(index)}
								onPress={() => navigation.navigate('UserForm')} />
							: <SerieCard
								user={item}
								isFirstColumn={isEven(index)}
								onPress={() => navigation.navigate('UserDetail', { user: item })}
							/>
					)}
					keyExtractor={item => item.id}
					numColumns={2}
					ListHeaderComponent={props => (<View style={styles.marginTop} />)}
					ListFooterComponent={props => (<View style={styles.marginBottom} />)}
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
	const { users } = state;
	if (users === null) {
		return { users }
	}

	const keys = Object.keys(users);
	const usersWithKeys = keys.map(id => {
		return { ...users[id], id }
	});
	return { users: usersWithKeys };
}

export default connect(
	mapStateToProps,
	{ watchUser }
)(UserPage);