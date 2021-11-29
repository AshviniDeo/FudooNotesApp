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
export default function WelcomeScreen() {
  const bg = require('../assets/bgimg.jpg');
  const [userName, setUserName] = useState('Username/Email');
  const [password, setPassword] = useState('Password');
  const onPressHandler = () => {};
  return (
    <ImageBackground source={bg} style={styles.background}>
      <View style={styles.container}>
        <View style={{height: 200}}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
        <View>
          <TextBox onChangeText={setUserName} value={userName} />
        </View>
        <View>
          <TextBox onChangeText={setPassword} value={password} />
        </View>
        <TouchableOpacity onPress={onPressHandler()}>
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
          <MyButton>
            <Text>Sign In</Text>
          </MyButton>
          <MyButton>
            <Text>Sign Up</Text>
          </MyButton>
        </View>
      </View>
    </ImageBackground>
  );
}
