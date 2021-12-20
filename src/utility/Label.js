import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './StyleSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const COLOR = 'rgba(0,0,0,0.8)';
const Label = prop => {
  return (
    <View style={styles.label}>
      <MaterialCommunityIcons name="label-outline" size={22} color={COLOR} />
      <Text style={{color: COLOR, fontSize: 14, left: 10}}>{prop.Label}</Text>
    </View>
  );
};

export default Label;
