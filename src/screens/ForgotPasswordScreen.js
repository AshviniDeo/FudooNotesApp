import React, {useState} from 'react';
import {View, ImageBackground, SafeAreaView} from 'react-native';
import TextBox from '../component/TextBox';
import {styles} from '../utility/StyleSheet';
import MyButton from '../component/MyButton';
export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState({});
  const getPassword = () => {
    const temp = {};
    if (!email) {
      temp.email = 'Enter Valid Email Id';
      setError(temp);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/key.jpg')}
      style={[{opacity: 6}, styles.background]}>
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    </ImageBackground>
  );
}
