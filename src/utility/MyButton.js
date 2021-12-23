import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {BORDER, COLOR, HEIGHT, MARGIN, PADDING, WIDTH} from './Theme';

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
    width: WIDTH.HALF_WIDTH,
    height: HEIGHT.SIGNBTN,
    borderBottomColor: COLOR.AUTH_COLOR,
    borderBottomWidth: BORDER.THICK_BORDER,
    borderStyle: 'solid',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: BORDER.CORNER,
    marginBottom: MARGIN.SECONDARY_MARGIN,
    borderRightColor: COLOR.SHADOW,
    borderRightWidth: BORDER.THICK_BORDER,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    padding: PADDING.SECONADARY_PADDING,
    marginLeft: MARGIN.PRIMARY_MARGIN,
    marginRight: MARGIN.PRIMARY_MARGIN,
  },
});
