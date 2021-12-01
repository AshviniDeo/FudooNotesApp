import React, {useState} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import TextBox from '../utility/TextBox';
import {styles} from '../utility/StyleSheet';
import MyButton from '../utility/MyButton';
export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState({});
  const getPassword = () => {
    const temp = {};
    if (!email) {
      temp['email'] = 'Enter Valid Email Id';
      setError(temp);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/key.jpg')}
      style={[{opacity: 6}, styles.background]}>
      <View style={styles.container}>
        <View>
          <TextBox
            onChangeText={text => setEmail(text)}
            value={email}
            errorText={error.email}
            placeHolder={'Enter email Id'}
          />
        </View>

        <View style={{alignItems: 'center'}}>
          <MyButton onPress={getPassword}>Get Password</MyButton>
        </View>
      </View>
    </ImageBackground>
  );
}
