import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from './StyleSheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLOR, SIZES} from './Theme';

const BottomBar = ({navigation, onPress}) => {
  return (
    <View style={styles.bottomBar}>
      <View style={styles.bottomIcon}>
        <Ionicon
          style={styles.icon}
          name={'checkbox-outline'}
          color={COLOR.TEXT_COLOR}
          size={SIZES.ICON_MEDIUM}
        />

        <Ionicon
          style={styles.icon}
          name={'brush'}
          color={COLOR}
          size={SIZES.ICON_MEDIUM}
        />

        <Ionicon
          style={styles.icon}
          name={'mic-outline'}
          color={COLOR.TEXT_COLOR}
          size={SIZES.ICON_MEDIUM}
        />

        <Ionicon
          style={styles.icon}
          name={'image'}
          color={COLOR}
          size={SIZES.ICON_MEDIUM}
        />

        <TouchableOpacity style={styles.barButton} onPress={onPress}>
          <View style={styles.plus}>
            <AntDesign
              name={'plus'}
              size={SIZES.ICON_LARGE}
              color={COLOR.TEXT_COLOR}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomBar;
