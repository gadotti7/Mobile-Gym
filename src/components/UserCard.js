import React from 'react';
import {
	Dimensions,
	StyleSheet,
	View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

const UserCard = ({ user, isFirstColumn, onPress, onLongPress}) => (
    <TouchableOpacity 
    onPress={onPress}
    onLongPress={onLongPress} 
    style={[
            styles.container,
            isFirstColumn ? styles.firstColumn : styles.lastColumn
        ]}>
		<View style={styles.card}>

            {
            user.img64
                ? <Image
                    source={{
                        uri: `data:image/jpeg;base64,${user.img64}`
                    }}
                    aspectRatio={1}
                    resizeMode="stretch"
                />
                : <Image
                    style={{flex: 1 ,width: null, height: null}}
                    source={ require('../assests/userPhoto.png') } 
                    aspectRatio={1}
                    resizeMode="stretch"
                />
            }

            <View style={styles.cardTitleWrapper}>
                <Text style={styles.cardTitle}>{user.email}</Text>
            </View>

        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
        width: '50%',
        padding: 5,
        height: Dimensions.get('window').width / 2
    },
	card: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#f0f0f0'
    },
    cardTitleWrapper: {
        backgroundColor: 'black',
        height: 50,

        position: 'absolute',
        bottom: 0,
        opacity: .7,
        width: '100%',
        
        paddingTop: 10,
        paddingBottom: 10,

        paddingRight: 3,
        paddingLeft: 3,

        alignItems: 'center'
    },
    cardTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    firstColumn: {
        paddingLeft: 10,
    },
    lastColumn: {
        paddingRight: 10,
    }
});

export default UserCard;