import React from 'react';
import {
	Dimensions,
	StyleSheet,
	View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

const AddWorkoutCard = ({ serie, isFirstColumn, onPress }) => (
    <TouchableOpacity 
    onPress={onPress}    
    style={[
            styles.container,
            isFirstColumn ? styles.firstColumn : styles.lastColumn
        ]}>
		<View style={styles.card}>
            <Image
                source = {require('../../resources/add.png')}
                style={styles.image}
            />
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
    },
    firstColumn: {
        paddingLeft: 10,
    },
    lastColumn: {
        paddingRight: 10,
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default AddWorkoutCard;