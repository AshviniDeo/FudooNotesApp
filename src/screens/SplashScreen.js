import React from 'react';
import {Text, ImageBackground} from 'react-native';

const SplashScreen = () => {
  return (
    <ImageBackground style={{flex: 1}} source={require('../assets/Splash.jpg')}>
      <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>
        Loading...
      </Text>
    </ImageBackground>
  );
};

export default SplashScreen;
