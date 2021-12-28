import React from 'react';
import {Text, ImageBackground} from 'react-native';
import {COLOR, SIZES} from '../utility/Theme';

const SplashScreen = () => {
  return (
    <ImageBackground
      style={{flex: SIZES.FLEX}}
      source={require('../assets/Splash.jpg')}>
      <Text
        style={{
          fontSize: SIZES.LARGE_TEXT,
          fontWeight: 'bold',
          color: COLOR.PRIMARY,
        }}>
        Loading...
      </Text>
    </ImageBackground>
  );
};

export default SplashScreen;
