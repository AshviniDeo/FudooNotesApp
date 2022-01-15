import React, {useContext, useState} from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {styles} from '../utility/StyleSheet';
import TextBox from '../component/TextBox';
import MyButton from '../component/MyButton';
import {AuthContext} from '../navigation/AuthProvider';

import useLocalisation from '../localisation/useLocalisation';

export default function SignUpScreen({navigation}) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const dictonary = useLocalisation('EN');
  const {register} = useContext(AuthContext);
  const validation = () => {
    setLoading(true);
    const emailRegx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    let valid = true;
    const temp = {};
    if (!userName) {
      valid = false;
      temp.userName = 'Enter Username (mandatory)*';
    }

    if (!email) {
      valid = false;
      temp.email = 'Enter Email (mandatory)*';
    }
    if (!emailRegx.test(email)) {
      valid = false;
      temp.email = 'Enter valid EmailID';
    }
    if (!phone) {
      valid = false;
      temp.phone = 'Enter Phone Number (mandatory)*';
    }

    if (!dateOfBirth) {
      valid = false;
      temp.dateOfBirth = 'Enter Date of Birth (mandatory)*';
    }
    if (!password) {
      valid = false;
      temp.password = 'Enter Password (mandatory)*';
    }
    if (!confirmPassword) {
      valid = false;
      temp.confirmPassword = 'Enter Confirm Password (mandatory)*';
    }
    if (confirmPassword !== password) {
      valid = false;
      temp.confirmPassword = 'Do not match Password ';
    }
    setError(temp);
    return valid;
  };

  const toNavigateHome = () => {
    navigation.navigate('Sign In');
  };
  const setCatchError = code => {
    const temp = {};
    if (code === 'auth/email-already-in-use') {
      temp.email = 'Email alredy in used';
    }
    setError(temp);
  };
  const getRegister = () => {
    setLoading(true);
    if (validation()) {
      register(
        email,
        password,
        toNavigateHome,
        setCatchError,
        phone,
        dateOfBirth,
        userName,
      );
      setLoading(false);
    }
  };
  return (
    <ImageBackground
      source={require('../assets/signup.jpg')}
      style={styles.background}>
      <ScrollView>
        <KeyboardAvoidingView behaviour="padding">
          <View style={styles.window}>
            <View>
              <TextBox
                onChangeText={text => setUserName(text)}
                value={userName}
                label={dictonary.ENTER_USERNAME_TEXT}
                errorText={error.userName}
                secureTextEntry={false}
              />
            </View>
            <View>
              <TextBox
                onChangeText={text => setEmail(text)}
                value={email}
                label={dictonary.ENTER_EMAIL_TEXT}
                errorText={error.email}
                secureTextEntry={false}
              />
            </View>
            <View>
              <TextBox
                onChangeText={text => setPhone(text)}
                value={phone}
                label={dictonary.ENTER_PHONE_NUMBER_TEXT}
                errorText={error.phone}
                secureTextEntry={false}
              />
            </View>
            <View>
              <TextBox
                onChangeText={text => setDateOfBirth(text)}
                value={dateOfBirth}
                label={dictonary.ENTER_DOB_TEXT}
                errorText={error.dateOfBirth}
                secureTextEntry={false}
              />
            </View>
            <View>
              <TextBox
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
                label={dictonary.ENTER_PASSWORD_TEXT}
                errorText={error.password}
              />
            </View>
            <View>
              <TextBox
                onChangeText={text => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry={true}
                label={dictonary.ENTER_CONFIRM_PASSWORD_TEXT}
                errorText={error.confirmPassword}
              />
            </View>
            <View style={styles.buttonLogIn}>
              <MyButton onPress={getRegister} loading={loading}>
                Register
              </MyButton>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
}
