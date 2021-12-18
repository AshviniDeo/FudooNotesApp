import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {styles} from '../utility/StyleSheet';
import Ionicon from 'react-native-vector-icons/Ionicons';

const SettingsScreen = ({navigation}) => {
  return (
    <View style={styles.background}>
      <View style={{flexDirection: 'row', left: 10, top: 10}}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Ionicon name={'menu'} size={28} color={'white'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Settings</Text>
      </View>
    </View>
  );
};

export default SettingsScreen;
