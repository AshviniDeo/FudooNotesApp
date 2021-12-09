import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

import AppStack from './AppStack';
import Notes from '../screens/Notes';
const AuthStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: 'darkslategrey'},
      }}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={{headerTintColor: 'white'}}
      />
      <Stack.Screen
        name="Forgot Password"
        component={ForgotPasswordScreen}
        options={{headerTintColor: 'white'}}
      />
      <Stack.Screen
        name="DrawerNavigation"
        component={AppStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notes"
        component={Notes}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
