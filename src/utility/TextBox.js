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
    backgroundColor: 'rgba(0,0,0,0)',
    width: '90%',
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderRadius: 9,
    justifyContent: 'center',
    alignContent: 'center',
    left: '10%',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 30,
    right: '10%',
    top: 20,
    fontSize: 18,
  },
});
