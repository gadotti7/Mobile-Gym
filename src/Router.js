import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import LoginPage from './pages/Login/LoginPage';
import WorkoutPage from './pages/UserViews/Workout/WorkoutPage';
import WorkoutDetailPage from './pages/UserViews/Workout/WorkoutDetailPage';
import WorkoutFormPage from './pages/UserViews/Workout/WorkoutFormPage';
import UserFormPage from './pages/User/UserFormPage';
import UserPage from './pages/User/UserPage';
import UserDetailPage from "./pages/User/UserDetailPage";
import WorkoutDetailAdm from './pages/User/WorkoutDetailAdm';
import ExerciceFormPage from './pages/Exercice/ExerciceFormPage';

const AppNavigator = createStackNavigator({
  'Login': {
    screen: LoginPage,
    navigationOptions: {
        header:null,
    }
  },
  'Main': {
      screen: WorkoutPage,
  },
  'WorkoutForm': {
      screen: WorkoutFormPage,
      navigationOptions: ({ navigation }) => {
          if (navigation.state.params && navigation.state.params.workoutToEdit) {
              return {
                  title: navigation.state.params.workoutToEdit.name,
              }
          }
          return {
              title: 'Novo Treino',
          };
      }
  },
  'WorkoutDetail': {
      screen: WorkoutDetailPage,
      navigationOptions: ({ navigation }) => {
          const { workout } = navigation.state.params;
          return {
              title: workout.name
          }
      }
  },
  'User': {
      screen: UserPage,
  },
  'UserForm': {
        screen: UserFormPage,
  },
  'UserDetail': {
    screen: UserDetailPage,
},
'WorkoutDetailAdm': {
    screen: WorkoutDetailAdm,
    navigationOptions: ({ navigation }) => {
        const { workout } = navigation.state.params;
        return {
            title: workout.name
        }
    }
},
 'ExerciceForm':{
     screen: ExerciceFormPage,
 }
}, {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
        headerTitle: 'Mobile Gym',
        headerTintColor: '#fff',
        headerStyle:{
            backgroundColor: '#ff0048',
        }
    }
});

export default createAppContainer(AppNavigator);