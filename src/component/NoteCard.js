import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {BORDER, COLOR, PADDING, SIZES} from '../utility/Theme';
import {styles} from '../utility/StyleSheet';
import {View} from 'react-native-animatable';

const NoteCard = props => {
  return (
    <View style={custom.card}>
      <Text style={custom.title}>{props.Title || ''}</Text>
      <Text style={custom.note}>{props.Note || ''}</Text>
    </View>
  );
};

const custom = StyleSheet.create({
  card: {
    padding: PADDING.PRIMARY_PADDING,
    backgroundColor: COLOR.NOTE_CARD,
    borderWidth: BORDER.LIGHT_BORDER,
    borderColor: COLOR.PLACE_HOLDER_COLOR,
    borderRadius: BORDER.CORNER,
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  title: {
    fontSize: SIZES.TITLE,
    color: COLOR.HEADING,
    fontWeight: 'bold',
  },
  note: {
    fontSize: SIZES.MEDIUM_TEXT,
    color: COLOR.PLACE_HOLDER_COLOR,
  },
});
export default NoteCard;
