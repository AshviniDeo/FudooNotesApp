import React from 'react';
import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import Notes from '../screens/Notes';
import Remainder from '../screens/Remainder';
import CreateNewLabel from '../screens/CreateNewLabel';
import CustomeDrawer from '../utility/CustomeDrawer';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
export default function AppStack() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator drawerContent={props => <CustomeDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: () => {
            <Ionicon name="home" size={22} color="gray" />;
          },
        }}
      />
      <Drawer.Screen
        name="Notes"
        component={Notes}
        options={{
          drawerIcon: () => {
            <Ionicon name="bulb-outline" size={22} color="gray" />;
          },
        }}
      />
      <Drawer.Screen
        name="Remainder"
        component={Remainder}
        options={{
          drawerIcon: () => {
            <FontAwesome5 name="bell" size={20} color="gray" />;
          },
        }}
      />
      <Drawer.Screen
        name="New label"
        component={CreateNewLabel}
        options={{
          drawerIcon: () => {
            <Feather name="plus" size={20} color="gray" />;
          },
        }}
      />
    </Drawer.Navigator>
  );
}
