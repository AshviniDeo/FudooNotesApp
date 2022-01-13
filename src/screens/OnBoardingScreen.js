import React from 'react';
import {Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnBoardingScreen = ({navigation}) => {
  return (
    <Onboarding
      onDone={() => {
        navigation.replace('Sign In');
      }}
      onSkip={() => {
        navigation.replace('Sign In');
      }}
      pages={[
        {
          backgroundColor: '#7fffd4',
          image: (
            <Image
              style={{resizeMode: 'center'}}
              source={require('../assets/musical-notes.png')}
            />
          ),
          title: 'FuNdooNotes',
          subtitle: 'Makes it easy to organize your notes',
        },
        {
          backgroundColor: '#fafad2',
          image: (
            <Image
              style={{resizeMode: 'center'}}
              source={require('../assets/notes.png')}
            />
          ),
          title: 'FuNdooNotes',
          subtitle: 'Makes it easy to organize your notes',
        },
        {
          backgroundColor: '#ffa07a',
          image: (
            <Image
              style={{resizeMode: 'center'}}
              source={require('../assets/sticky-note.png')}
            />
          ),
          title: 'FuNdooNotes',
          subtitle: 'Makes it easy to organize your notes',
        },
      ]}
    />
  );
};

export default OnBoardingScreen;
