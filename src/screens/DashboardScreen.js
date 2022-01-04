import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import Ionicon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {fetchNoteData} from '../services/NoteServices';
import NoteCard from '../component/NoteCard';
import BottomBar from '../component/BottomBar';
import {styles} from '../utility/StyleSheet';
import TopBar from '../component/TopBar';
import {LogBox} from 'react-native';
import {COLOR, SIZES} from '../utility/Theme';
import FlatListComponent from '../component/FlatListComponent';
// import {useSelector, useDispatch} from 'react-redux';
// import {setNote} from '../redux/Actions';

LogBox.ignoreLogs(['Reanimated 2', 'VirtualizedLists should never be nested']);

const DashboardScreen = ({navigation}) => {
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
    <SafeAreaView style={styles.background}>
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
              <ScrollView>
                <View style={styles.window}>
                  {pinData.find(item => item.Pinned) && (
                    <Text style={styles.subtitles}>Pinned:</Text>
                  )}
                  <FlatListComponent
                    data={pinData}
                    navigation={navigation}
                    active={active}
                    keyExtractor={item => item.noteId}
                    refreshing={isLoading}
                    onRefresh={fetchData}
                  />
                </View>
                <View style={styles.window}>
                  {pinData.find(item => item.Pinned === true) && (
                    <Text style={styles.subtitles}>Others:</Text>
                  )}
                  <FlatListComponent
                    data={noteData}
                    active={active}
                    navigation={navigation}
                    keyExtractor={item => item.noteId}
                    ListFooterComponent={renderLoader}
                    onEndReached={loadMoreItem}
                    onEndReachedThreshold={0}
                  />
                </View>
              </ScrollView>
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
        listPress={() => {
          navigation.navigate('Notes', {List: true});
        }}
      />
    </SafeAreaView>
  );
};

export default DashboardScreen;
