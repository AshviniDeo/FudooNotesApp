import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fetchNoteData} from '../services/NoteServices';
import {styles} from '../utility/StyleSheet';
import TopBar from '../component/TopBar';
import {COLOR, SIZES} from '../utility/Theme';
import {LogBox} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FlatListComponent from '../component/FlatListComponent';
import SearchNote from '../utility/SearchNote';
import useLocalisation from '../localisation/useLocalisation';

LogBox.ignoreAllLogs(true);

const ArchiveScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false);
  const [noteData, setNoteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dictonary = useLocalisation('EN');

  const fetchData = async () => {
    let data = await fetchNoteData();
    const unpin = [];
    data.forEach(item => {
      if (item.Archive) {
        unpin.push(item);
      }
    });
    setNoteData(unpin);
    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);
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
          text={<Text>{dictonary.ARCHIVE_TEXT}</Text>}
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
                  {dictonary.ARCHIVE_EMPTY_TEXT}
                </Text>
              </View>
            ) : (
              <View style={styles.window}>
                <FlatListComponent
                  data={noteData}
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
    </SafeAreaView>
  );
};

export default ArchiveScreen;
