import React, {useState} from 'react';
import {View, Text, ImageBackground, ScrollView} from 'react-native';
import {styles} from '../utility/StyleSheet';
import TextBox from '../utility/TextBox';
import MyButton from '../utility/MyButton';

export default function SignUpScreen({navigation}) {
  const [userName, setUserName] = useState('Enter UserName');
  const [email, setEmail] = useState('Enter Email address');
  const [phone, setPhone] = useState('Enter phone number');
  const [dateOfBirth, setDateOfBirth] = useState(
    'Enter Date of Birth (DD/MM/YYYY)',
  );
  const [password, setPassword] = useState('Enter Password');
  const [confirmPassword, setConfirmPassword] = useState(
    'Enter Confirm Password',
  );
  const getRegister = () => {
    const arr = [
      {userName},
      {email},
      {phone},
      {dateOfBirth},
      {password},
      {confirmPassword},
    ];
    console.log(arr);
    navigation.goBack();
  };
  return (
    <ImageBackground
      source={require('../assets/signup.jpg')}
      style={styles.background}>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <TextBox
              onChangeText={text => setUserName(text)}
              value={userName}
            />
          </View>
          <View>
            <TextBox onChangeText={text => setEmail(text)} value={email} />
          </View>
          <View>
            <TextBox onChangeText={text => setPhone(text)} value={phone} />
          </View>
          <View>
            <TextBox
              onChangeText={text => setDateOfBirth(text)}
              value={dateOfBirth}
            />
          </View>
          <View>
            <TextBox
              onChangeText={text => setPassword(text)}
              value={password}
            />
          </View>
          <View>
            <TextBox
              onChangeText={text => setConfirmPassword(text)}
              value={confirmPassword}
            />
          </View>
          <View style={{alignContent: 'center', alignItems: 'center'}}>
            <MyButton onPress={getRegister}>Register</MyButton>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
