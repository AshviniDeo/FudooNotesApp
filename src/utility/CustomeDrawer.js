import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../navigation/AuthProvider';

const CustomeDrawer = ({navigation, props}) => {
  const {signout} = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{}}>
      <View style={{flex: 1, paddingTop: 10}}>
        <View style={[styles.view, styles.heading]}>
          <Text style={styles.heading}>FundooNotes</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Dashboard');
            }}>
            <View style={styles.view}>
              <Ionicon name="bulb-outline" size={22} color={'white'} />
              <Text style={styles.text}>Notes</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Remainder');
            }}>
            <View style={styles.view}>
              <FontAwesome name="bell-o" size={22} color={'white'} />
              <Text style={styles.text}>Remainder</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Create new label');
            }}>
            <View style={styles.view}>
              <FontAwesome5 name="plus" size={22} color={'white'} />
              <Text style={styles.text}>Create new label</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ArchiveScreen');
            }}>
            <View style={styles.view}>
              <Ionicon name="archive-outline" size={22} color={'white'} />
              <Text style={styles.text}>Archive</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Trash');
            }}>
            <View style={styles.view}>
              <Ionicon name="trash-outline" size={22} color={'white'} />
              <Text style={styles.text}>Trash</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Settings');
            }}>
            <View style={styles.view}>
              <Ionicon name="settings-outline" size={22} color={'white'} />
              <Text style={styles.text}>Settings</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              signout();
            }}>
            <View style={[styles.view, {justifyContent: 'center'}]}>
              <MaterialCommunityIcons name="logout" size={22} color={'white'} />
              <Text style={styles.text}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 10,
  },
  view: {
    paddingTop: 20,
    flexDirection: 'row',
    paddingLeft: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default CustomeDrawer;
