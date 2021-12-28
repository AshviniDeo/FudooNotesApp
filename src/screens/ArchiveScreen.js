import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import NoteCard from '../component/NoteCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fetchArchiveData} from '../services/NoteServices';
import {styles} from '../utility/StyleSheet';
import TopBar from '../component/TopBar';
import {COLOR, SIZES} from '../utility/Theme';

const ArchiveScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false);
  const [noteData, setNoteData] = useState([]);

  const fetchData = async () => {
    let data = await fetchArchiveData();
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
      <TopBar
        menuPress={() => {
          navigation.openDrawer();
        }}
        text={<Text>Archive</Text>}
        onSearch={text => {
          setSearch(text);
        }}
        value={search}
        onPress={() => {
          setActive(!active);
        }}
        icon={true}
        searchIcon={false}
      />
      {search.length === 0 ? (
        <View style={styles.container}>
          {noteData.length === 0 ? (
            <View style={styles.middle}>
              <FontAwesome
                name={'archive'}
                size={SIZES.EMPTY_ICON}
                color={COLOR.EMPTY_FIELD_ICON}
              />
              <Text style={styles.middleText}>
                Your achived notes appear here
              </Text>
            </View>
          ) : (
            <View style={styles.window}>
              <FlatList
                data={noteData}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={active ? styles.grid : styles.list}
                    onPress={() => {
                      navigation.navigate('Notes', {
                        editData: item,
                        editId: item.noteId,
                      });
                    }}>
                    <NoteCard {...item} />
                  </TouchableOpacity>
                )}
                numColumns={active ? 2 : 1}
                key={active ? 2 : 1}
                keyExtractor={item => item.noteId}
              />
            </View>
          )}
        </View>
      ) : (
        <View style={{flex: 3}}>
          <FlatList
            data={noteData}
            renderItem={({item}) =>
              item.Title === search || item.Note === search ? (
                <TouchableOpacity
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
            numColumns={active ? 2 : 1}
            key={active ? 2 : 1}
            keyExtractor={item => item.noteId}
          />
        </View>
      )}
    </View>
  );
};

export default ArchiveScreen;
