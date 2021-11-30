import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import MyButton from '../utility/MyButton';
import {styles} from '../utility/StyleSheet';
import TextBox from '../utility/TextBox';
import HomeScreen from './HomeScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

export default function WelcomeScreen({navigation}) {
  const bg = require('../assets/bgimg.jpg');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = () => {
    if (userName === 'Ashvini' && password === '1234') {
      navigation.navigate({name: 'Home'});
    } else {
      alert('Invalid UserName/Password');
      setPassword('');
      setUserName('');
    }
  };
  const onSignUp = () => {
    navigation.navigate({name: 'Sign Up'});
  };
  const forgetPassword = () => {
    navigation.navigate({name: 'Forgot Password'});
  };
  return (
    <ImageBackground source={bg} style={styles.background}>
      <View style={styles.container}>
        <View style={{height: 200}}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
        <View>
          <TextBox
            onChangeText={text => setUserName(text)}
            value={userName}
            placeHolder="UserName/Email"
          />
        </View>
        <View>
          <TextBox
            onChangeText={setPassword}
            value={password}
            placeHolder="Enter Password"
          />
        </View>
        <TouchableOpacity onPress={forgetPassword}>
          <View>
            <Text
              style={{
                color: 'tomato',
                textAlign: 'center',
                fontWeight: 'bold',
                top: 30,
              }}>
              Forgot password.
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '80%',
            flexDirection: 'row',
            top: 30,
            left: '7%',
            right: '8%',
          }}>
          <MyButton onPress={onSignIn}>
            <Text>Sign In</Text>
          </MyButton>
          <MyButton onPress={onSignUp}>
            <Text>Sign Up</Text>
          </MyButton>
        </View>
      </View>
    </ImageBackground>
  );
}
