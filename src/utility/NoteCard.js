import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BORDER, COLOR, MARGIN, PADDING, SIZES} from './Theme';

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
    justifyContent: 'center',
    alignContent: 'center',
    margin: MARGIN.PRIMARY_MARGIN,
    paddingBottom: MARGIN.BOTTOM_MARGIN,
    marginBottom: MARGIN.BOTTOM_MARGIN,
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
