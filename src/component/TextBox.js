import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLOR, MARGIN, PADDING} from '../utility/Theme';
import {TextInput} from 'react-native-paper';

export default function TextBox({
  onChangeText,
  value,
  label,
  secureTextEntry,
  errorText = undefined,
}) {
  return (
    <View>
      <TextInput
        style={styles.box}
        label={label}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        selectionColor={COLOR.AUTH_COLOR}
        underlineColor={COLOR.AUTH_COLOR}
        activeUnderlineColor={COLOR.AUTH_COLOR}
      />

      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    margin: MARGIN.PRIMARY_MARGIN,
    backgroundColor: COLOR.TRANSPARENT,
    marginLeft: MARGIN.SECONDARY_MARGIN,
  },
  errorText: {
    color: COLOR.ERROR_TEXT,
    textAlign: 'center',
    padding: PADDING.PRIMARY_PADDING,
    fontWeight: 'bold',
  },
});
