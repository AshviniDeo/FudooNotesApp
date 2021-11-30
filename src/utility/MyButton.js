import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function MyButton({onPress, children}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <View>
        <Text>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#eee8aa',
    width: '40%',
    height: 50,
    borderBottomColor: '#cd853f',
    borderBottomWidth: 5,
    borderStyle: 'solid',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 8,
    marginBottom: 30,
    borderRightColor: '#cd853f',
    borderRightWidth: 5,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    top: 30,
  },
});
