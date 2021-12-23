import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';

import MyButton from '../utility/MyButton';
import {styles} from '../utility/StyleSheet';
import TextBox from '../utility/TextBox';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import {AuthContext} from '../navigation/AuthProvider';
import {PADDING, WIDTH} from '../utility/Theme';

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
      temp.userName = 'Enter Valid Username';
    }
    if (!password) {
      valid = false;
      temp.password = 'Enter Valid Password';
    }
    setError(temp);
    return valid;
  };

  const setCatchError = code => {
    const temp = {};
    if (code === 'auth/user-not-found') {
      temp.userName = 'Invalid Email';
    }

    if (code === 'auth/wrong-password') {
      temp.password = 'Invalid Password';
    }

    if (code === 'auth/user-not-found') {
      temp.userName = 'User not Found';
    }

    setError(temp);
  };
  const onSignIn = () => {
    if (validation()) {
      login(userName, password, setCatchError);
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
        <View
          style={[
            styles.container,
            {
              justifyContent: 'flex-end',
              paddingBottom: PADDING.BUTTON_PADDING,
            },
          ]}>
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
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry
              placeHolder={'Enter Password'}
              errorText={error.password}
            />
          </View>
          <TouchableOpacity onPress={forgetPassword}>
            <View>
              <Text style={styles.passwordLink}>Forgot password.</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.buttonLogIn}>
            <MyButton onPress={onSignIn}>
              <Text style={styles.button}>Sign In</Text>
            </MyButton>
            <MyButton onPress={onSignUp}>
              <Text style={styles.button}>Sign Up</Text>
            </MyButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
