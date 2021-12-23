import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {styles} from '../utility/StyleSheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {COLOR, SIZES} from '../utility/Theme';

const SettingsScreen = ({navigation}) => {
  return (
    <View style={styles.background}>
      <View style={styles.trashBar}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Ionicon
              name={'menu'}
              size={SIZES.ICON_MEDIUM}
              color={COLOR.TEXT_COLOR}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.trashText}>Settings</Text>
      </View>
    </View>
  );
};

export default SettingsScreen;
