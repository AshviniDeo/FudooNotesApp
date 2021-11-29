import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

export default function TextBox({onChangeText, value}) {
  return (
    <TextInput
      style={styles.box}
      onChangeText={text => onChangeText(text)}
      value={value}
      maxLength={40}
    />
  );
}
const styles = StyleSheet.create({
  box: {
    backgroundColor: '#eee8aa',
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
    color: 'gray',
    marginBottom: 30,
    right: '15%',
    top: 30,
  },
});
