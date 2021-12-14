import React from 'react';
import {View, Text} from 'react-native';

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'gold',
      }}>
      <Text>Loading....</Text>
    </View>
  );
};

export default SplashScreen;
