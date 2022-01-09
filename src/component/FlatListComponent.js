import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import NoteCard from './NoteCard';
import {styles} from '../utility/StyleSheet';
import {LogBox} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
const FlatListComponent = ({
  active,
  navigation,
  data,
  ListFooterComponent,
  onEndReached,
  onEndReachedThreshold,
  refreshing,
  onRefresh,
  setData,
}) => {
  const renderItem = ({item, drag}) => (
    <TouchableOpacity
      onLongPress={drag}
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
    <DraggableFlatList
      data={data}
      onDragEnd={setData}
      scrollEnabled={false}
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
