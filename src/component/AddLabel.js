import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {styles} from '../utility/StyleSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SIZES, COLOR} from '../utility/Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddLabel = props => {
  const label = props.Label;

  return (
    <View>
      <View style={styles.labelView}>
        <MaterialCommunityIcons
          name="label-outline"
          size={SIZES.ICON_MEDIUM}
          color={COLOR.TEXT_COLOR}
        />

        <Text style={styles.icon}>{label}</Text>
      </View>
    </View>
  );
};

export default AddLabel;
