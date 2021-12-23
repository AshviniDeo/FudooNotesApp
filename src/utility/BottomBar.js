import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from './StyleSheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const COLOR = 'rgba(0,0,0,0.9)';
const BottomBar = ({navigation, onPress}) => {
  return (
    <View style={styles.bottomBar}>
      <View style={styles.bottomIcon}>
        <Ionicon
          style={styles.icon}
          name={'checkbox-outline'}
          color={COLOR}
          size={25}
        />

        <Ionicon style={styles.icon} name={'brush'} color={COLOR} size={25} />

        <Ionicon
          style={styles.icon}
          name={'mic-outline'}
          color={COLOR}
          size={25}
        />

        <Ionicon style={styles.icon} name={'image'} color={COLOR} size={25} />
        <View style={styles.space}></View>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.plus}>
            <AntDesign name={'plus'} size={40} color={COLOR} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomBar;
