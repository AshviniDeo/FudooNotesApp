import React from 'react';
import {View, StyleSheet} from 'react-native';
import {widthPercentageToDP} from '../utility/DynamicDimension';
import {BORDER, COLOR, HEIGHT, MARGIN, PADDING} from '../utility/Theme';
import {Button} from 'react-native-paper';

export default function MyButton({onPress, children, loading = false}) {
  return (
    <View>
      <Button
        style={styles.btn}
        mode="contained"
        onPress={onPress}
        loading={loading}
        labelStyle={{color: COLOR.AUTH_COLOR}}>
        {children}
      </Button>
    </View>
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
