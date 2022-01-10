import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';

import Ionicon from 'react-native-vector-icons/Ionicons';
import {fetchNoteData} from '../services/NoteServices';
import BottomBar from '../component/BottomBar';
import {styles} from '../utility/StyleSheet';
import TopBar from '../component/TopBar';
import {LogBox} from 'react-native';
import {COLOR, SIZES} from '../utility/Theme';
import PushNotification from 'react-native-push-notification';
import FlatListComponent from '../component/FlatListComponent';
import SearchNote from '../utility/SearchNote';

import useLocalisation from '../localisation/useLocalisation';
// import {useSelector, useDispatch} from 'react-redux';
// import {setNote} from '../redux/Actions';

LogBox.ignoreLogs(['Reanimated 2']);
LogBox.ignoreAllLogs(true);

const DashboardScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false);
  const [noteData, setNoteData] = useState([]);
  const [pinData, setPinData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState([]);

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };

  const dictonary = useLocalisation('EN');

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
      createChannels();
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    });

    return unsubscribe;
  }, [navigation, fetchData, currentPage]);

  if (isLoading) {
    return (
      <Image
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
      <ScrollView nestedScrollEnabled={true}>
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
          navigation={navigation}
        />

        {search.length === 0 ? (
          <View style={styles.container}>
            {noteData.length === 0 ? (
              <View style={styles.blank}>
                <Ionicon
                  name={'bulb-outline'}
                  size={SIZES.EMPTY_ICON}
                  color={COLOR.EMPTY_FIELD_ICON}
                />
                <Text style={styles.middleText}>
                  {dictonary.DASHBOARD_EMPTY_TEXT}
                </Text>
              </View>
            ) : (
              <View style={styles.window}>
                <View style={styles.window}>
                  {pinData.find(item => item.Pinned) && (
                    <Text style={styles.subtitles}>
                      {dictonary.PINNED_TEXT}
                    </Text>
                  )}
                  <FlatListComponent
                    data={pinData}
                    setData={({data}) => setPinData(data)}
                    navigation={navigation}
                    active={active}
                    keyExtractor={item => item.noteId}
                    refreshing={isLoading}
                    onRefresh={fetchData}
                  />
                </View>
                <View style={styles.window}>
                  {pinData.find(item => item.Pinned === true) && (
                    <Text style={styles.subtitles}>{dictonary.OTHER_TEXT}</Text>
                  )}
                  <FlatListComponent
                    data={noteData}
                    setData={({data}) => setNoteData(data)}
                    active={active}
                    navigation={navigation}
                    keyExtractor={item => item.noteId}
                    ListFooterComponent={renderLoader}
                    onEndReached={loadMoreItem}
                    onEndReachedThreshold={0}
                  />
                </View>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.window}>
            <SearchNote
              search={search}
              navigation={navigation}
              active={active}
              searchData={searchData}
            />
          </View>
        )}
      </ScrollView>
      <BottomBar
        onPress={() => {
          navigation.navigate('Notes');
        }}
        listPress={() => {
          navigation.navigate('Notes', {
            IsList: true,
          });
        }}
      />
    </SafeAreaView>
  );
};

export default DashboardScreen;
