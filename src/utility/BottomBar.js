import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from './StyleSheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BottomBar = ({navigation, onPress}) => {
  return (
    <View style={styles.bottomBar}>
      <View style={styles.bottomIcon}>
        <Ionicon
          style={styles.icon}
          name={'checkbox-outline'}
          color={'white'}
          size={22}
        />

        <Ionicon style={styles.icon} name={'brush'} color={'white'} size={22} />

        <Ionicon
          style={styles.icon}
          name={'mic-outline'}
          color={'white'}
          size={22}
        />

        <Ionicon style={styles.icon} name={'image'} color={'white'} size={22} />
        <View style={{width: '45%'}}></View>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.plus}>
            <AntDesign name={'plus'} size={40} color={'black'} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomBar;
