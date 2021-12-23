import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {styles} from '../utility/StyleSheet';
import {fetchTrashData} from '../navigation/NoteServices';
import NoteCard from '../utility/NoteCard';

const Trash = ({navigation}) => {
  const [noteData, setNoteData] = useState([]);

  const fetchData = async () => {
    let data = await fetchTrashData();
    setNoteData(data);
    console.log('===data ===', data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.background}>
      <View style={styles.trashBar}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Ionicon name={'menu'} size={28} color={'rgba(0,0,0,0.9)'} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.trashText}>Trash</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          flex: 3,
        }}>
        {noteData.length === 0 ? (
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              left: '5%',
              top: '30%',
            }}>
            <FontAwesome name={'trash'} size={100} color={'gold'} />
            <Text
              style={{
                color: 'rgba(0,0,0,0.9)',
                fontSize: 18,
                alignItems: 'center',
                top: 15,
              }}>
              No notes in Trash
            </Text>
          </View>
        ) : (
          <View style={styles.window}>
            <FlatList
              data={noteData}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Notes', {
                      editData: item,
                      editId: item.noteId,
                    });
                  }}>
                  <NoteCard {...item} />
                </TouchableOpacity>
              )}
              key={1}
              keyExtractor={item => item.noteId}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Trash;
