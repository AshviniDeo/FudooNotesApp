import React from 'react';
import {TextInput, StyleSheet, Text, View} from 'react-native';

export default function TextBox({
  placeHolder = '',
  onChangeText,
  value,
  secureTextEntry = false,
  errorText = undefined,
}) {
  return (
    <View>
      <TextInput
        style={styles.box}
        onChangeText={text => onChangeText(text)}
        value={value}
        maxLength={40}
        editable
        placeholder={placeHolder}
        secureTextEntry={secureTextEntry}
      />
      {errorText && (
        <Text
          style={{
            color: 'red',
            textAlign: 'center',
            top: 5,
            left: '15%',
            right: '15%',
            fontWeight: 'bold',
          }}>
          {errorText}
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    backgroundColor: 'darkslategrey',
    width: '75%',
    height: 50,
    borderBottomColor: '#cd853f',
    borderBottomWidth: 5,
    borderStyle: 'solid',
    alignItems: 'center',
    borderRadius: 9,
    justifyContent: 'center',
    alignContent: 'center',
    left: '15%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    right: '15%',
    top: 20,
  },
});
