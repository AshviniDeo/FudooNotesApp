import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {colors, styles} from '../utility/StyleSheet';
import {HEIGHT} from '../utility/Theme';

const ColorPalette = ({refPalette, setBackgroundColor}) => {
  return (
    <View>
      <RBSheet ref={refPalette} height={HEIGHT.BUTTON_HEIGHT}>
        <ScrollView horizontal>
          {colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setBackgroundColor(color)}
              style={[styles.paletteView, {backgroundColor: color}]}
            />
          ))}
        </ScrollView>
      </RBSheet>
    </View>
  );
};

export default ColorPalette;
