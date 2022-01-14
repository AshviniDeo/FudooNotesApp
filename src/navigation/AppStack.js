import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Label from '../component/Label';
import InsertLabel from '../component/InsertLabel';
import AppDrawer from './AppDrawer';
import {Provider} from 'react-redux';
import {Store} from '../redux/Store';
import index from '../screens/createnote';

export const AppStack = () => {
  const Stack = createStackNavigator();

  return (
    // <Provider store={Store}>
    <Stack.Navigator initialRouteName={'AppDrawer'}>
      <Stack.Screen
        name={'AppDrawer'}
        component={AppDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'Notes'}
        component={index}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'Labels'}
        component={Label}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'AddLabel'}
        component={InsertLabel}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
    // {/* </Provider> */}
  );
};
