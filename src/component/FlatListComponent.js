import React from 'react';
import {TouchableOpacity, FlatList} from 'react-native';
import NoteCard from './NoteCard';
import {styles} from '../utility/StyleSheet';
import {LogBox} from 'react-native';
// import DraggableFlatList from 'react-native-draggable-flatlist';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
const FlatListComponent = ({
  active,
  navigation,
  data,
  refreshing,
  onRefresh,
  setData,
}) => {
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      key={item.noteId}
      style={active ? styles.grid : styles.list}
      onPress={() => {
        navigation.navigate('Notes', {
          editData: item,
          editId: item.noteId,
          IsList: item.IsList,
        });
      }}>
      <NoteCard {...item} />
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={data}
      onDragEnd={setData}
      renderItem={renderItem}
      numColumns={!active ? 1 : 2}
      key={active ? 3 : 4}
      keyExtractor={item => item.noteId}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default FlatListComponent;
