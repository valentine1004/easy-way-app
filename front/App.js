import LoginScreen from './screens/login/Login';
import RegisterScreen from './screens/register/Register';
import PatientScreen from './screens/patient/Patient';
import DoctorScreen from './screens/doctor/Doctor';
import HomeScreen from './screens/home/Home';
import AuthLoadingScreen from './screens/authLoading/AuthLoadingScreen';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppStack = createStackNavigator({ Home: HomeScreen, Patient: PatientScreen, Doctor: DoctorScreen });
const AuthStack = createStackNavigator({ Login: LoginScreen, Register: RegisterScreen });

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
