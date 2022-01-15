import React, {useState} from 'react';
import {View, ImageBackground, SafeAreaView} from 'react-native';
import TextBox from '../component/TextBox';
import {styles} from '../utility/StyleSheet';
import MyButton from '../component/MyButton';
import useLocalisation from '../localisation/useLocalisation';
import {widthPercentageToDP} from '../utility/DynamicDimension';

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
    <SafeAreaView style={styles.background}>
      <View
        style={[
          styles.window,
          {justifyContent: 'space-around', alignContent: 'center'},
        ]}>
        <TextBox
          style={styles.labelBox}
          onChangeText={text => setEmail(text)}
          label={dictonary.ENTER_EMAIL_TEXT}
          value={email}
          errorText={error.email}
          secureTextEntry={false}
        />
      </View>

      <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
        <MyButton
          onPress={getPassword}
          style={{width: widthPercentageToDP('100%')}}>
          Get
        </MyButton>
      </View>
    </SafeAreaView>
  );
}
