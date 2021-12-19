import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

import Ionicon from 'react-native-vector-icons/Ionicons';

import {fetchNoteData} from '../navigation/NoteServices';
import NoteCard from '../utility/NoteCard';
import BottomBar from '../utility/BottomBar';
import {styles} from '../utility/StyleSheet';
import TopBar from '../utility/TopBar';

const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false);
  const [noteData, setNoteData] = useState([]);

  const fetchData = async () => {
    let data = await fetchNoteData();
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
        text={<Text>Dashboard</Text>}
        onSearch={text => {
          setSearch(text);
        }}
        value={search}
        onPress={() => {
          setActive(!active);
        }}
      />
      {search.length === 0 ? (
        <View
          style={{
            flex: 3,
          }}>
          {noteData.length === 0 ? (
            <View style={styles.middle}>
              <Ionicon name={'bulb-outline'} size={100} color={'white'} />
              <Text style={styles.middleText}>Notes you added appear here</Text>
            </View>
          ) : (
            <View style={styles.window}>
              <Text style={styles.subtitles}>Pinned:</Text>
              <FlatList
                style={{flexDirection: active ? 'row' : 'column'}}
                data={noteData}
                renderItem={({item}) =>
                  item.Pinned === true ? (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Notes', {
                          editData: item,
                          editId: item.id,
                        });
                      }}>
                      <NoteCard {...item} />
                    </TouchableOpacity>
                  ) : null
                }
                numColumns={active ? 2 : 1}
              />
              <Text style={styles.subtitles}>Others:</Text>
              <FlatList
                data={noteData}
                renderItem={({item}) =>
                  item.Pinned === false ? (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Notes', {
                          editData: item,
                          editId: item.id,
                        });
                      }}>
                      <NoteCard {...item} />
                    </TouchableOpacity>
                  ) : null
                }
                numColumns={active ? 2 : 1}
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
                      editId: item.id,
                    });
                  }}>
                  <NoteCard {...item} />
                </TouchableOpacity>
              ) : null
            }
          />
        </View>
      )}
      <BottomBar
        onPress={() => {
          navigation.navigate('Notes');
        }}
      />
    </View>
  );
};

export default HomeScreen;
