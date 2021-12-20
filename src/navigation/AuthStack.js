import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const AuthStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#e6e6fa'},
      }}>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={{headerTintColor: 'rgba(0,0,0,0.8)'}}
      />
      <Stack.Screen
        name="Forgot Password"
        component={ForgotPasswordScreen}
        options={{headerTintColor: 'rgba(0,0,0,0.8)'}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
