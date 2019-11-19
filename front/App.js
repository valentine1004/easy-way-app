import LoginScreen from './screens/login/Login';
import RegisterScreen from './screens/register/Register';
import PatientScreen from './screens/patient/Patient';
import DoctorScreen from './screens/doctor/Doctor';
import ManagerScreen from './screens/manager/Manager';
import FamilyDoctorsScreen from './screens/familyDoctors/FamilyDoctors';
import HomeScreen from './screens/home/Home';
import AuthLoadingScreen from './screens/authLoading/AuthLoadingScreen';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Patient: {
      screen: PatientScreen,
      navigationOptions: {
        title: 'Пацієнт',
        headerStyle: {
          backgroundColor: '#2C73D2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    },
    Doctor: {
      screen: DoctorScreen,
      navigationOptions: {
        title: 'Лікар',
        headerStyle: {
          backgroundColor: '#2C73D2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    },
    Manager: {
      screen: ManagerScreen,
      navigationOptions: {
        title: 'Адміністратор поліклініки',
        headerStyle: {
          backgroundColor: '#2C73D2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    }
  });

const AuthStack = createStackNavigator({ Login: LoginScreen, Register: RegisterScreen, FamilyDoctors: FamilyDoctorsScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
