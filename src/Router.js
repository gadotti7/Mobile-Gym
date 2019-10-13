import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import LoginPage from './pages/LoginPage';
import WorkoutPage from './pages/WorkoutPage';
import WorkoutDetailPage from './pages/WorkoutDetailPage';
import WorkoutFormPage from './pages/WorkoutFormPage';

const AppNavigator = createStackNavigator({
  'Login': {
    screen: LoginPage,
    navigationOptions: {
        title: 'Login!',
  }
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
  defaultNavigationOptions: {
    title: "MobileGym",
    headerTintColor: 'white',
    headerStyle:{
      backgroundColor: '#00a33c',
      borderBottomWidth: 1,
      borderBottomColor: '#C5C5C5',
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: 30,
      flexGrow: 1,
    }
  }
});

export default createAppContainer(AppNavigator);