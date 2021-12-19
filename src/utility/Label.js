import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './StyleSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Label = prop => {
  return (
    <View style={styles.label}>
      <MaterialCommunityIcons name="label-outline" size={22} color={'white'} />
      <Text style={{color: 'white', fontSize: 14, left: 10}}>{prop.Label}</Text>
    </View>
  );
};

export default Label;
