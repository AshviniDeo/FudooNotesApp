import React, {useState} from 'react';
import {View, ImageBackground, SafeAreaView} from 'react-native';
import TextBox from '../component/TextBox';
import {styles} from '../utility/StyleSheet';
import MyButton from '../component/MyButton';
import useLocalisation from '../localisation/useLocalisation';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState({});
  const getPassword = () => {
    const temp = {};
    if (!email) {
      temp.email = dictonary.VALID_EMAIL_ERROR_TEXT;
      setError(temp);
    }
  };
  const dictonary = useLocalisation('EN');
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
            placeHolder={dictonary.ENTER_EMAIL_TEXT}
          />
        </View>

        <View style={{alignItems: 'center'}}>
          <MyButton onPress={getPassword}>
            {dictonary.GET_PASSWORD_TEXT}
          </MyButton>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
