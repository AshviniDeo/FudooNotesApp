import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

import Ionicon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {fetchNoteData} from '../navigation/NoteServices';
import NoteCard from '../utility/NoteCard';
import BottomBar from '../utility/BottomBar';
import {styles} from '../utility/StyleSheet';
import TopBar from '../utility/TopBar';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Reanimated 2']);
const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(true);
  const [noteData, setNoteData] = useState([]);
  const [pinData, setPinData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    let data = await fetchNoteData();
    const pin = [];
    const unpin = [];
    data.forEach(item => {
      if (item.Pinned && !item.Trash) {
        pin.push(item);
      } else if (!item.Pinned && !item.Trash) {
        unpin.push(item);
      }
    });
    setNoteData(unpin);
    setPinData(pin);
    setIsLoading(false);
  }, [setIsLoading]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation, fetchData]);

  if (isLoading) {
    return (
      <Animatable.Image
        animation="pulse"
        resizeMode="contain"
        style={styles.loader}
        source={require('../assets/loader.gif')}
      />
    );
  }

  const BottomList = () => {
    return (
      <View>
        {noteData.find(item => item.Pinned === false) && (
          <Text style={styles.subtitles}>Others:</Text>
        )}
        <FlatList
          data={noteData}
          renderItem={({item}) => (
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
          )}
          numColumns={active ? 1 : 2}
          key={active ? 3 : 4}
          keyExtractor={item => item.noteId}
        />
      </View>
    );
  };
  return (
    <View style={styles.background}>
      <TopBar
        menuPress={() => {
          navigation.openDrawer();
        }}
        searchIcon={true}
        onSearch={text => {
          setSearch(text);
        }}
        value={search}
        onPress={() => {
          setActive(!active);
        }}
        icon={active}
      />

      {search.length === 0 ? (
        <View
          style={{
            flex: 3,
          }}>
          {noteData.length === 0 ? (
            <View style={styles.middle}>
              <Ionicon name={'bulb-outline'} size={100} color={'gold'} />
              <Text style={styles.middleText}>Notes you added appear here</Text>
            </View>
          ) : (
            <View style={styles.window}>
              {noteData.find(item => item.Pinned) && (
                <Text style={styles.subtitles}>Pinned:</Text>
              )}
              <FlatList
                data={pinData}
                renderItem={({item}) => (
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
                )}
                numColumns={active ? 1 : 2}
                key={active ? 1 : 2}
                keyExtractor={item => item.noteId}
                ListFooterComponent={<BottomList />}
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
            numColumns={!active ? 2 : 1}
            key={!active ? 5 : 6}
            keyExtractor={item => item.noteId}
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
