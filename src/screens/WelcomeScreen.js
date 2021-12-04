import React, {useState, useContext} from 'react';
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
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import {AuthContext} from '../navigation/AuthProvider';

export default function WelcomeScreen({navigation}) {
  const bg = require('../assets/bgimg.jpg');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});

  const {login} = useContext(AuthContext);
  const validation = () => {
    let valid = true;
    const temp = {};
    if (!userName) {
      valid = false;
      temp['userName'] = 'Enter Valid Username';
    }
    if (!password) {
      valid = false;
      temp['password'] = 'Enter Valid Password';
    }
    setError(temp);
    return valid;
  };
  const onSignIn = () => {
    if (validation) {
      login(userName, password);
      navigation.navigate({name: 'Home'});
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
      <KeyboardAvoidingView style={styles.container} behaviour="padding">
        <View style={styles.container}>
          <View style={{height: 200}}>
            <Image
              style={styles.logo}
              source={require('../assets/logo2.png')}
            />
          </View>
          <View>
            <TextBox
              onChangeText={text => setUserName(text)}
              value={userName}
              placeHolder={'UserName/Email'}
              errorText={error.userName}
            />
          </View>
          <View>
            <TextBox
              onChangeText={setPassword}
              value={password}
              secureTextEntry
              placeHolder={'Enter Password'}
              errorText={error.password}
            />
          </View>
          <TouchableOpacity onPress={forgetPassword}>
            <View>
              <Text
                style={{
                  color: 'blue',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  top: 30,
                  padding: 3,
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
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
