import React, {useState} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import TextBox from '../utility/TextBox';
import {styles} from '../utility/StyleSheet';
import MyButton from '../utility/MyButton';
export default function ForgotPasswordScreen() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('Enter Email');
  const getPassword = () => {
    if (email === 'Ashvini@mail.com') {
      setPassword(1234);
    } else {
      setPassword('Invalid Email Id');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/key.jpg')}
      style={[{opacity: 6}, styles.background]}>
      <View style={styles.container}>
        <View>
          <TextBox onChangeText={text => setEmail(text)} value={email} />
        </View>
        <View style={styles.output}>
          <Text>{password}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <MyButton onPress={getPassword}>Get Password</MyButton>
        </View>
      </View>
    </ImageBackground>
  );
}
