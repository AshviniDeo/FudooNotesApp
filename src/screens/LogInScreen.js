import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import MyButton from '../component/MyButton';
import {styles} from '../utility/StyleSheet';
import TextBox from '../component/TextBox';
import {AuthContext} from '../navigation/AuthProvider';

import useLocalisation from '../localisation/useLocalisation';

export default function WelcomeScreen({navigation}) {
  const bg = require('../assets/bgimg.jpg');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});

  const dictonary = useLocalisation('EN');
  const {login, googlelogin} = useContext(AuthContext);
  const validation = () => {
    let valid = true;
    const temp = {};
    if (!userName) {
      valid = false;
      temp.userName = dictonary.VALID_EMAIL_ERROR_TEXT;
    }
    if (!password) {
      valid = false;
      temp.password = dictonary.VALID_PASSWORD_ERROR_TEXT;
    }
    setError(temp);
    return valid;
  };

  const setCatchError = code => {
    const temp = {};
    if (code === 'auth/user-not-found') {
      temp.userName = dictonary.INVALID_USER;
    }

    if (code === 'auth/wrong-password') {
      temp.password = dictonary.INVALID_PASSWORD;
    }

    if (code === 'auth/user-not-found') {
      temp.userName = dictonary.USER_NOT_FOUND;
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
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={[styles.window]}>
            <View>
              <TextBox
                onChangeText={text => setUserName(text)}
                label={dictonary.ENTER_USERNAME_TEXT}
                value={userName}
                errorText={error.userName}
                secureTextEntry={false}
              />
            </View>
            <View>
              <TextBox
                onChangeText={text => setPassword(text)}
                value={password}
                label={dictonary.ENTER_PASSWORD_TEXT}
                errorText={error.password}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity onPress={forgetPassword}>
              <View>
                <Text style={styles.passwordLink}>
                  {dictonary.FORGOT_PASSWORD} ?
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.buttonLogIn}>
              <MyButton onPress={onSignIn}>
                <Text style={styles.button}>{dictonary.SIGN_IN_TEXT}</Text>
              </MyButton>
              <MyButton onPress={onSignUp}>
                <Text style={styles.button}>{dictonary.SIGN_UP_TEXT}</Text>
              </MyButton>
            </View>
            {Platform.OS === 'android' && (
              <View style={styles.middle}>
                <Text style={styles.blankText}>Or</Text>

                <View style={styles.googlebtn}>
                  <TouchableOpacity
                    onPress={() => {
                      googlelogin();
                    }}>
                    <Text style={styles.googleTxt}>
                      {dictonary.GOOGLE_SIGN_TEXT}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
