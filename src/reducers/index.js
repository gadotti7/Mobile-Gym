import { combineReducers } from 'redux';

import workoutFormReducer from './workoutFormReducer';
import workoutReducer from './workoutReducer';


export default combineReducers({
	workoutForm: workoutFormReducer,
	workout: workoutReducer,
});