import React from 'react';
import {
	Dimensions,
	StyleSheet,
	View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

const WorkoutCard = ({ workout, isFirstColumn, onPress }) => (
    <TouchableOpacity 
    onPress={onPress}    
    style={[
            styles.container,
            isFirstColumn ? styles.firstColumn : styles.lastColumn
        ]}>
		<View style={styles.card}>
            <Image
                source = {{
                    uri: workout.img
                }}
                aspectRatio={1}
                resizeMode="cover"
                />
            <View style={styles.cardTitleWrapper}>
                <Text style={styles.cardTitle}>{workout.title}</Text>
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
        borderWidth: 1
    },
    cardTitleWrapper: {
        backgroundColor: 'black',
        height: 50,

        position: 'absolute',
        bottom: 0,
        opacity: .8,
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

export default WorkoutCard;