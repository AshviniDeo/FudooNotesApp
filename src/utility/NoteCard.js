import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

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
    padding: 20,
    backgroundColor: 'aliceblue',
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
  note: {
    fontSize: 16,
    color: 'dimgray',
  },
});
export default NoteCard;
