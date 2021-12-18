import React from 'react';
import {View, Text, Dimensions} from 'react-native';

const SettingsScreen = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  console.log('Height : ', windowHeight);
  console.log('Width', windowWidth);
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export default SettingsScreen;
