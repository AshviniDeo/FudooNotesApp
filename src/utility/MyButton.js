import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function MyButton({onPress, children}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <View>
        <Text style={{color: '#cd853f', fontWeight: 'bold', fontSize: 20}}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'lavender',
    width: '50%',
    height: 50,
    borderBottomColor: '#cd853f',
    borderBottomWidth: 5,
    borderStyle: 'solid',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 8,
    marginBottom: 30,
    borderRightColor: 'skyblue',
    borderRightWidth: 5,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    top: 30,
    color: 'black',
    paddingRight: 20,
  },
});
