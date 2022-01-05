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

export default function WelcomeScreen({navigation}) {
  const bg = require('../assets/bgimg.jpg');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});

  const {login, googlelogin} = useContext(AuthContext);
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
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={[styles.window]}>
            <View>
              <TextBox
                onChangeText={text => setUserName(text)}
                label={'UserName/Email'}
                value={userName}
                errorText={error.userName}
                secureTextEntry={false}
              />
            </View>
            <View>
              <TextBox
                onChangeText={text => setPassword(text)}
                value={password}
                label={'Enter Password'}
                errorText={error.password}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity onPress={forgetPassword}>
              <View>
                <Text style={styles.passwordLink}>Forgot password ?</Text>
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
            {Platform.OS === 'android' && (
              <View style={styles.blank}>
                <Text style={styles.blankText}>Or</Text>

                <View style={styles.googlebtn}>
                  <TouchableOpacity
                    onPress={() => {
                      googlelogin().then(() =>
                        console.log('Signed in with Google!'),
                      );
                    }}>
                    <Text style={styles.googleTxt}>Sign in with Google </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.facebookbtn}>
                  <TouchableOpacity>
                    <Text style={styles.facebookTxt}>
                      Sign in with Facebook
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
