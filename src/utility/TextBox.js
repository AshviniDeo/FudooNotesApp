import React from 'react';
import {TextInput, StyleSheet, Text, View} from 'react-native';
import {BORDER, COLOR, HEIGHT, PADDING, SIZES, WIDTH} from './Theme';

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
        placeholderTextColor={COLOR.PLACE_HOLDER_COLOR}
        secureTextEntry={secureTextEntry}
      />
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    flexWrap: 'wrap',
    backgroundColor: COLOR.TRANSPARENT,
    width: WIDTH.FULL_WIDTH,
    height: HEIGHT.BUTTON_HEIGHT,
    borderBottomColor: COLOR.AUTH_COLOR,
    borderBottomWidth: BORDER.MEDIUM_BORDER,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignContent: 'center',
    fontWeight: 'bold',
    color: COLOR.HEADING,
    fontSize: 16,
    padding: PADDING.PRIMARY_PADDING,
  },
  errorText: {
    color: COLOR.ERROR_TEXT,
    textAlign: 'center',
    padding: PADDING.PRIMARY_PADDING,
    fontWeight: 'bold',
  },
});
