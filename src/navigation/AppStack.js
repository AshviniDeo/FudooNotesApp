import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import CustomeDrawer from '../utility/CustomeDrawer';
import Notes from '../screens/Notes';
function AppDrawer() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'dimgrey',
        },
        headerShown: false,
        drawerInactiveTintColor: 'white',
      }}
      drawerContent={props => <CustomeDrawer {...props} />}>
      <Drawer.Screen name="Dashboard" component={'Dashboard'} />
      <Drawer.Screen name="Remainder" component={'Remainder'} />
      <Drawer.Screen name="Create new label" component={'CreateNewLabel'} />
      <Drawer.Screen name="ArchiveScreen" component={'ArchiveScreen'} />
      <Drawer.Screen name="Trash" component={'Trash'} />
      <Drawer.Screen name="Settings" component={'SettingsScreen'} />
    </Drawer.Navigator>
  );
}
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
    </Stack.Navigator>
  );
};
