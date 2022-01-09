import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {styles} from '../utility/StyleSheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TopBar from '../component/TopBar';
import BottomBar from '../component/BottomBar';
import {COLOR, SIZES} from '../utility/Theme';
import {fetchNoteData} from '../services/NoteServices';
import * as Animatable from 'react-native-animatable';
import {LogBox} from 'react-native';
import FlatListComponent from '../component/FlatListComponent';
import SearchNote from '../utility/SearchNote';

import useLocalisation from '../localisation/useLocalisation';

LogBox.ignoreAllLogs(['VirtualList']);

const Reminder = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false);
  const [noteData, setNoteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    let data = await fetchNoteData();
    const rem = [];
    data.forEach(item => item.Remainder && rem.push(item));
    setNoteData(rem);
    setIsLoading(false);
  }, [setIsLoading]);

  const dictonary = useLocalisation('EN');
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

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
        <TopBar
          menuPress={() => {
            navigation.openDrawer();
          }}
          text={<Text>{dictonary.REMINDER_TEXT}</Text>}
          onSearch={text => {
            setSearch(text);
          }}
          value={search}
          onPress={() => {
            setActive(!active);
          }}
          icon={active}
          searchIcon={false}
        />

        {/* Header-End */}
        {search.length === 0 ? (
          <View style={styles.container}>
            {noteData.length === 0 ? (
              <View style={styles.middle}>
                <FontAwesome
                  name={'bell-o'}
                  size={SIZES.EMPTY_ICON}
                  color={COLOR.EMPTY_FIELD_ICON}
                />
                <Text style={styles.blankText}>
                  {dictonary.REMINDER_EMPTY_TEXT}
                </Text>
              </View>
            ) : (
              <View style={styles.window}>
                <FlatListComponent
                  data={noteData}
                  setData={({data}) => setNoteData(data)}
                  navigation={navigation}
                  active={active}
                  keyExtractor={item => item.noteId}
                  refreshing={isLoading}
                  onRefresh={fetchData}
                />
              </View>
            )}
          </View>
        ) : (
          <View style={styles.window}>
            <SearchNote
              search={search}
              navigation={navigation}
              active={active}
              searchData={noteData}
            />
          </View>
        )}
      </ScrollView>
      <BottomBar
        onPress={() => {
          navigation.navigate('Notes');
        }}
      />
    </SafeAreaView>
  );
};

export default Reminder;
