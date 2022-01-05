import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import {COLOR} from '../utility/Theme';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const AuthStack = () => {
  const Stack = createStackNavigator();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '668023202159-mbtr2hsom3jk4hht8or1c2l0ngqm3klt.apps.googleusercontent.com',
    });
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: COLOR.SECONDARY},
      }}>
      <Stack.Screen
        name="LogIn"
        component={LogInScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={{headerTintColor: COLOR.TEXT_COLOR}}
      />
      <Stack.Screen
        name="Forgot Password"
        component={ForgotPasswordScreen}
        options={{headerTintColor: COLOR.TEXT_COLOR}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
