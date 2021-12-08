import React from 'react';
import {View, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const CustomeDrawer = props => {
  return (
    <View
      style={{flex: 1, backgroundColor: 'darkslategrey', shadowColor: 'white'}}>
      <DrawerContentScrollView {...props} contentContainerStyle={{}}>
        <View style={{flex: 1, paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomeDrawer;
