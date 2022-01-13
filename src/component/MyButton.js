import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {widthPercentageToDP} from '../utility/DynamicDimension';
import {BORDER, COLOR, HEIGHT, MARGIN, PADDING, WIDTH} from '../utility/Theme';

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
    backgroundColor: COLOR.SECONDARY,
    width: widthPercentageToDP('35%'),
    height: HEIGHT.SIGNBTN,
    borderBottomColor: COLOR.AUTH_COLOR,
    borderBottomWidth: BORDER.THICK_BORDER,
    borderStyle: 'solid',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: BORDER.CORNER,
    margin: MARGIN.PRIMARY_MARGIN,
    borderRightColor: COLOR.SHADOW,
    borderRightWidth: BORDER.THICK_BORDER,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    padding: PADDING.SECONADARY_PADDING,
  },
});
