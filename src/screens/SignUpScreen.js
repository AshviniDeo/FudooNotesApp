import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {styles} from '../utility/StyleSheet';
import TextBox from '../utility/TextBox';
import MyButton from '../utility/MyButton';

export default function SignUpScreen({navigation}) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({});
  const validation = () => {
    const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    let valid = true;
    const temp = {};
    if (!userName) {
      valid = false;
      temp['userName'] = 'Enter Username (mandatory)*';
    }

    if (!email) {
      valid = false;
      temp['email'] = 'Enter Email (mandatory)*';
    }
    if (!emailRegx.test(email)) {
      valid = false;
      temp['email'] = 'Enter valid EmailID';
    }
    if (!phone) {
      valid = false;
      temp['phone'] = 'Enter Phone Number (mandatory)*';
    }

    if (!dateOfBirth) {
      valid = false;
      temp['dateOfBirth'] = 'Enter Date of Birth (mandatory)*';
    }
    if (!password) {
      valid = false;
      temp['password'] = 'Enter Password (mandatory)*';
    }
    if (!confirmPassword) {
      valid = false;
      temp['confirmPassword'] = 'Enter Confirm Password (mandatory)*';
    }
    if (confirmPassword != password) {
      valid = false;
      temp['confirmPassword'] = 'Do not match Password ';
    }
    setError(temp);
    return valid;
  };
  const getRegister = () => {
    if (validation()) {
      navigation.goBack();
    }
  };
  return (
    <ImageBackground
      source={require('../assets/signup.jpg')}
      style={styles.background}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behaviour="padding">
          <View style={styles.container}>
            <View>
              <TextBox
                onChangeText={text => setUserName(text)}
                value={userName}
                placeHolder={'Enter Username'}
                errorText={error.userName}
              />
            </View>
            <View>
              <TextBox
                onChangeText={text => setEmail(text)}
                value={email}
                placeHolder={'Enter Email ID'}
                errorText={error.email}
              />
            </View>
            <View>
              <TextBox
                onChangeText={text => setPhone(text)}
                value={phone}
                placeHolder={'Enter Phone Number'}
                errorText={error.phone}
              />
            </View>
            <View>
              <TextBox
                onChangeText={text => setDateOfBirth(text)}
                value={dateOfBirth}
                placeHolder={'Enter Date-of-Birth(DD/MM/YYYY)'}
                errorText={error.dateOfBirth}
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
            <View>
              <TextBox
                onChangeText={text => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry
                placeHolder={'Enter Confirm Password'}
                errorText={error.confirmPassword}
              />
            </View>
            <View style={{alignContent: 'center', alignItems: 'center'}}>
              <MyButton onPress={getRegister}>Register</MyButton>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
}
