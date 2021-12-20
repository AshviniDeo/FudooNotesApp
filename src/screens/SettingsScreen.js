import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {styles} from '../utility/StyleSheet';
import Ionicon from 'react-native-vector-icons/Ionicons';

const SettingsScreen = ({navigation}) => {
  return (
    <View style={styles.background}>
      <View style={styles.trashBar}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Ionicon name={'menu'} size={28} color={'rgba(0,0,0,0.9)'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Settings</Text>
      </View>
    </View>
  );
};

export default SettingsScreen;
