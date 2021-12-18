import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import CustomeDrawer from '../utility/CustomeDrawer';
import Notes from '../screens/Notes';
import HomeScreen from '../screens/HomeScreen';
import CreateNewLabel from '../screens/CreateNewLabel';
import SettingsScreen from '../screens/SettingsScreen';
import Remainder from '../screens/Remainder';
import Trash from '../screens/Trash';
import ArchiveScreen from '../screens/ArchiveScreen';

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
      <Drawer.Screen name="Dashboard" component={HomeScreen} />
      <Drawer.Screen name="Remainder" component={Remainder} />
      <Drawer.Screen name="Create new label" component={CreateNewLabel} />
      <Drawer.Screen name="ArchiveScreen" component={ArchiveScreen} />
      <Drawer.Screen name="Trash" component={Trash} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
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
