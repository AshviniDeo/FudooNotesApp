import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
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

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const Trash = ({navigation}) => {
  const [noteData, setNoteData] = useState([]);

  const fetchData = async () => {
    let trash = [];
    let data = await fetchNoteData();
    console.log(data);
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

  const renderLoader = () => {
    return (
      <View style={styles.loaderStyle}>
        <ActivityIndicator color={COLOR.ACTIVE_COLOR} size={'large'} />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.background}>
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
          <Text style={styles.trashText}>Trash</Text>
        </View>
      </View>
      <View style={styles.window}>
        {noteData.length === 0 ? (
          <View style={styles.middle}>
            <FontAwesome
              name={'trash'}
              size={SIZES.EMPTY_ICON}
              color={COLOR.EMPTY_FIELD_ICON}
            />
            <Text style={styles.middleText}>No notes in Trash</Text>
          </View>
        ) : (
          <View style={styles.window}>
            <ScrollView>
              <FlatListComponent
                data={noteData}
                active={true}
                key={1}
                keyExtractor={item => item.noteId}
                ListFooterComponent={renderLoader}
              />
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Trash;
