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
import ArchiveScreen from '../screens/ArchiveScreen';
import Trash from '../screens/Trash';
import Settings from '../screens/Settings';
import CreateNotes from '../screens/CreateNotes';

export default function AppStack() {
  const Drawer = createDrawerNavigator();
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: {
            backgroundColor: 'darkslategrey',
          },
          headerShown: false,
          drawerInactiveTintColor: 'white',
        }}>
        <Drawer.Screen
          name="Notes"
          component={HomeScreen}
          options={{
            drawerIcon: () => {
              <Ionicon name={'bulb-outline'} size={22} />;
            },
          }}
        />
        <Drawer.Screen name="Remainder" component={Remainder} />
        <Drawer.Screen name="Create new label" component={CreateNewLabel} />
        <Drawer.Screen name="Archive" component={'ArchiveScreen'} />
        <Drawer.Screen name="Trash" component={'Trash'} />
        <Drawer.Screen name="Settings" component={'Settings'} />
      </Drawer.Navigator>
    </View>
  );
}
