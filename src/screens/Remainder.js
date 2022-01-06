import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {styles} from '../utility/StyleSheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TopBar from '../component/TopBar';
import BottomBar from '../component/BottomBar';
import {COLOR, SIZES} from '../utility/Theme';
import {fetchNoteData} from '../services/NoteServices';
import NoteCard from '../component/NoteCard';
import * as Animatable from 'react-native-animatable';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs(['VirtualList']);

const Reminder = ({navigation}) => {
  const [search, setSearch] = useState(false);
  const [active, setActive] = useState(false);
  const [value, setValue] = useState('');
  const [noteData, setNoteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    let data = await fetchNoteData();
    const rem = [];
    data.forEach(item => item.Remainder && rem.push(item));
    setNoteData(rem);
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

  return (
    <SafeAreaView style={styles.background}>
      <TopBar
        menuPress={() => {
          navigation.openDrawer();
        }}
        text={<Text>Reminder</Text>}
        serachIcon={() => {
          setSearch(!search);
        }}
        onSearch={text => {
          setValue(text);
        }}
        value={value}
        searchIcon={false}
        onPress={() => {
          setActive(!active);
        }}
        icon={active}
      />
      {/* Header-End */}
      <View style={styles.container}>
        {noteData.length === 0 ? (
          <View style={styles.middle}>
            <FontAwesome
              name={'bell-o'}
              size={SIZES.EMPTY_ICON}
              color={COLOR.EMPTY_FIELD_ICON}
            />
            <Text style={styles.blankText}>
              Notes with upcoming remainders appear here
            </Text>
          </View>
        ) : (
          <View style={styles.window}>
            <ScrollView>
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
            </ScrollView>
          </View>
        )}
      </View>

      <BottomBar
        onPress={() => {
          navigation.navigate('Notes');
        }}
      />
    </SafeAreaView>
  );
};

export default Reminder;
