import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import LoginPage from './pages/Login/LoginPage';
import WorkoutPage from './pages/Workout/WorkoutPage';
import WorkoutDetailPage from './pages/Workout/WorkoutDetailPage';
import WorkoutFormPage from './pages/Workout/WorkoutFormPage';

import logo from './assests/mobileGym.png';

const AppNavigator = createStackNavigator({
  'Login': {
    screen: LoginPage,
  },
  'Main': {
      screen: WorkoutPage,
  },
  'WorkoutForm': {
      screen: WorkoutFormPage,
      navigationOptions: ({ navigation }) => {
          if (navigation.state.params && navigation.state.params.serieToEdit) {
              return {
                  title: navigation.state.params.serieToEdit.title,
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
          const { serie } = navigation.state.params;
          return {
              title: serie.title
          }
      }
  },
}, {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
        headerTitle: <Image source={logo} />,
        headerTintColor: 'white',
        headerStyle:{
            backgroundColor: '#F5F5F5',
        }
    } 
});

export default createAppContainer(AppNavigator);