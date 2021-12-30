import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Notes from '../screens/Notes';
import Label from '../component/Label';
import InsertLabel from '../component/InsertLabel';
import AppDrawer from './AppDrawer';

export const AppStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="AppDrawer">
      <Stack.Screen
        name="AppDrawer"
        component={AppDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notes"
        component={Notes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Label"
        component={Label}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddLabel"
        component={InsertLabel}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
