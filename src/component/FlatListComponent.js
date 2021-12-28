import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import NoteCard from './NoteCard';
import {styles} from '../utility/StyleSheet';

const FlatListComponent = ({
  active,
  navigation,
  data,
  ListFooterComponent,
  onEndReached,
  onEndReachedThreshold,
  refreshing,
  onRefresh,
}) => {
  const renderItem = ({item}) => (
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
  );
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      numColumns={active ? 1 : 2}
      key={active ? 3 : 4}
      keyExtractor={item => item.noteId}
      ListFooterComponent={ListFooterComponent}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default FlatListComponent;
