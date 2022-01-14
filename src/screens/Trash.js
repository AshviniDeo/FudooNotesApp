import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {styles} from '../utility/StyleSheet';
import {fetchNoteData} from '../services/NoteServices';
import {COLOR, SIZES} from '../utility/Theme';
import FlatListComponent from '../component/FlatListComponent';
import {LogBox} from 'react-native';
import useLocalisation from '../localisation/useLocalisation';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const Trash = ({navigation}) => {
  const [noteData, setNoteData] = useState([]);

  const dictonary = useLocalisation('EN');
  const fetchData = async () => {
    let trash = [];
    let data = await fetchNoteData();
    data.forEach(item => {
      if (item.Trash) {
        trash.push(item);
      }
    });
    setNoteData(trash);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
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
            <Text style={styles.trashText}>{dictonary.TRASH_TEXT}</Text>
          </View>
        </View>
        <View style={styles.window}>
          {noteData.length === 0 ? (
            <View style={styles.blank}>
              <FontAwesome
                name={'trash'}
                size={SIZES.EMPTY_ICON}
                color={COLOR.EMPTY_FIELD_ICON}
              />
              <Text style={styles.middleText}>
                {dictonary.TRASH_EMPTY_TEXT}
              </Text>
            </View>
          ) : (
            <View>
              <FlatListComponent
                data={noteData}
                setData={({data}) => setNoteData(data)}
                active={true}
                key={1}
                keyExtractor={item => item.noteId}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Trash;
