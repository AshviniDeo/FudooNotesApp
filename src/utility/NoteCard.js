import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BORDER, COLOR, PADDING, SIZES} from './Theme';

const NoteCard = props => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{props.Title || ''}</Text>
      <Text style={styles.note}>{props.Note || ''}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
