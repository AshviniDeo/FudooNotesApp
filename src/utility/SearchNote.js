import React from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';

import NoteCard from '../component/NoteCard';
import {styles} from './StyleSheet';

const SearchNote = ({search, active, navigation, searchData}) => {
  return (
    <View>
      <FlatList
        data={searchData}
        renderItem={({item}) =>
          item.Title.toLowerCase().includes(search.toLowerCase()) ||
          item.Note.toLowerCase().includes(search.toLowerCase()) ? (
            <TouchableOpacity
              style={!active ? styles.grid : styles.list}
              onPress={() => {
                navigation.navigate('Notes', {
                  editData: item,
                  editId: item.noteId,
                });
              }}>
              <NoteCard {...item} />
            </TouchableOpacity>
          ) : null
        }
        numColumns={!active ? 2 : 1}
        key={!active ? 5 : 6}
        keyExtractor={item => item.noteId}
      />
    </View>
  );
};

export default SearchNote;
