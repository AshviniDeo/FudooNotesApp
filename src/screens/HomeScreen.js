import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import Ionicon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {fetchNoteData} from '../navigation/NoteServices';
import NoteCard from '../utility/NoteCard';
import BottomBar from '../utility/BottomBar';
import {styles} from '../utility/StyleSheet';
import TopBar from '../utility/TopBar';
import {LogBox} from 'react-native';
import {COLOR, SIZES} from '../utility/Theme';

LogBox.ignoreLogs(['Reanimated 2']);
const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(true);
  const [noteData, setNoteData] = useState([]);
  const [pinData, setPinData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState([]);

  const fetchData = useCallback(async () => {
    let data = await fetchNoteData();
    setSearchData(data);
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
  }, [navigation, fetchData, currentPage]);

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
    const loadMoreItem = () => {
      setCurrentPage(currentPage + 1);
    };

    const renderLoader = () => {
      return (
        <View style={styles.loaderStyle}>
          <ActivityIndicator color={COLOR.ACTIVE_COLOR} size={'large'} />
        </View>
      );
    };

    return (
      <View style={styles.window}>
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
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
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
        <View style={styles.container}>
          {noteData.length === 0 ? (
            <View style={styles.middle}>
              <Ionicon
                name={'bulb-outline'}
                size={SIZES.EMPTY_ICON}
                color={COLOR.EMPTY_FIELD_ICON}
              />
              <Text style={styles.middleText}>Notes you added appear here</Text>
            </View>
          ) : (
            <View style={styles.window}>
              {pinData.find(item => item.Pinned) && (
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
                refreshing={isLoading}
                onRefresh={fetchData}
              />
            </View>
          )}
        </View>
      ) : (
        <View style={styles.window}>
          <FlatList
            data={searchData}
            renderItem={({item}) =>
              item.Title === search || item.Note === search ? (
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
