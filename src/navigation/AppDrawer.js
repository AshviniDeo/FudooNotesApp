import React from 'react';
import {COLOR} from '../utility/Theme';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomeDrawer from '../utility/CustomeDrawer';
import DashboardScreen from '../screens/DashboardScreen';
import CreateNewLabel from '../screens/CreateNewLabel';
import SettingsScreen from '../screens/SettingsScreen';
import Reminder from '../screens/Remainder';
import Trash from '../screens/Trash';
import ArchiveScreen from '../screens/ArchiveScreen';

const AppDrawer = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName={'Dashboard'}
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'white',
        },
        headerShown: false,
        drawerActiveBackgroundColor: COLOR.SECONDARY,
      }}
      drawerContent={props => <CustomeDrawer {...props} />}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Reminder" component={Reminder} />
      <Drawer.Screen name="Create new label" component={CreateNewLabel} />
      <Drawer.Screen name="ArchiveScreen" component={ArchiveScreen} />
      <Drawer.Screen name="Trash" component={Trash} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
