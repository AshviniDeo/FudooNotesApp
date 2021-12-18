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
    backgroundColor: 'gray',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  note: {
    fontSize: 16,
    color: 'white',
  },
});
export default NoteCard;
