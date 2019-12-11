import { combineReducers } from 'redux';

import workoutFormReducer from './workoutFormReducer';
import workoutReducer from './workoutReducer';
import userReducer from './userReducer';
import userFormReducer from './userFormReducer';
import exerciceFormReducer from './exerciceFormReducer';
import exerciceReducer from './exerciceReducer';

export default combineReducers({
	workoutForm: workoutFormReducer,
	workout: workoutReducer,
	user: userReducer,
	userForm: userFormReducer,
	exerciceForm: exerciceFormReducer,
	exercice: exerciceReducer,
});