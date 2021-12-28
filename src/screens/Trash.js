import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {styles} from '../utility/StyleSheet';
import {fetchTrashData} from '../services/NoteServices';
import NoteCard from '../component/NoteCard';
import {COLOR, SIZES} from '../utility/Theme';

const Trash = ({navigation}) => {
  const [noteData, setNoteData] = useState([]);

  const fetchData = async () => {
    let data = await fetchTrashData();
    setNoteData(data);
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
            <Ionicon
              name={'menu'}
              size={SIZES.ICON_MEDIUM}
              color={COLOR.TEXT_COLOR}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.trashText}>Trash</Text>
        </View>
      </View>
      <View style={styles.window}>
        {noteData.length === 0 ? (
          <View style={styles.middle}>
            <FontAwesome
              name={'trash'}
              size={SIZES.EMPTY_ICON}
              color={COLOR.EMPTY_FIELD_ICON}
            />
            <Text style={styles.middleText}>No notes in Trash</Text>
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
