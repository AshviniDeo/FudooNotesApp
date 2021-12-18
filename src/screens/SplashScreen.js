import React from 'react';
import {Text, ImageBackground} from 'react-native';
import {styles} from '../utility/StyleSheet';

const SplashScreen = () => {
  return (
    <ImageBackground style={{flex: 1}} source={require('../assets/Splash.jpg')}>
      <Text style={styles.middleText}>Loading...</Text>
    </ImageBackground>
  );
};

export default SplashScreen;
