import { combineReducers } from 'redux';

import workoutFormReducer from './workoutFormReducer';
import workoutReducer from './workoutReducer';
import userReducer from './userReducer';
import userFormReducer from './userFormReducer';

export default combineReducers({
	workoutForm: workoutFormReducer,
	workout: workoutReducer,
	user: userReducer,
	userForm: userFormReducer,
});