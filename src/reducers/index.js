import { combineReducers } from 'redux';

import userReducer from './userReducer';
import workoutFormReducer from './workoutFormReducer';
import workoutReducer from './workoutReducer';


export default combineReducers({
	user: userReducer,
	workoutForm: workoutFormReducer,
	workout: workoutReducer,
});