import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fetchNoteData} from '../navigation/NoteServices';
import NoteCard from '../screens/NoteCard';

const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState();
  const [active, setActive] = useState(false);
  const [noteData, setNoteData] = useState([]);
  const handlePress = () => {
    setActive(!active);
  };

  const fetchData = async () => {
    let data = await fetchNoteData();
    setNoteData(data);
    console.log('===data ===');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);
  console.log('NoteDatta=====>', noteData);
  return (
    <View style={{flex: 1, backgroundColor: 'black', opacity: 0.9}}>
      <View
        style={{
          justifyContent: 'space-evenly',
          backgroundColor: 'dimgrey',
          height: '8%',
          width: '100%',
          borderRadius: 20,
          flexDirection: 'row',
          alignContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <View style={{alignItems: 'flex-start'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Ionicon name={'menu'} size={28} color={'white'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '50%',
          }}>
          <TouchableOpacity>
            <TextInput
              style={{fontSize: 18}}
              placeholder={'Search your notes'}
              placeholderTextColor={'white'}
              onChangeText={text => {
                setSearch(text);
              }}
              value={search}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Pressable
            onPress={() => {
              handlePress();
            }}>
            {active ? (
              <FontAwesome name={'tasks'} size={30} color={'white'} />
            ) : (
              <Ionicon name={'grid'} size={30} color={'white'} />
            )}
          </Pressable>
        </View>
        <View style={{right: '3%'}}>
          <FontAwesome name={'user-circle'} size={30} color={'white'} />
        </View>
      </View>
      <View
        style={{
          height: '75%',
        }}>
        {noteData.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              left: '3%',
            }}>
            <Ionicon name={'bulb-outline'} size={100} color={'white'} />
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                alignItems: 'center',
                top: 10,
              }}>
              Notes you added appear here
            </Text>
          </View>
        ) : (
          <View style={{justifyContent: 'center', alignContent: 'center'}}>
            <Text
              style={{
                color: 'white',
                paddingLeft: 20,
                paddingTop: 10,
                fontSize: 16,
              }}>
              Pinned:
            </Text>
            <View>
              <FlatList
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
                numColumns={!active ? 1 : 2}
              />
            </View>

            <Text
              style={{
                color: 'white',
                paddingLeft: 20,
                paddingTop: 10,
                fontSize: 16,
              }}>
              Others:
            </Text>
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
              numColumns={!active ? 1 : 2}
            />
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Notes');
        }}>
        <View
          style={{
            left: '75%',
            shadowColor: 'white',
            shadowRadius: 50,
            backgroundColor: 'dimgray',
            height: 70,
            width: 70,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            borderColor: 'black',
            borderEndWidth: 6,
            borderBottomWidth: 6,
            opacity: 0.9,
          }}>
          <AntDesign name={'plus'} size={35} color={'white'} />
        </View>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'flex-start',
          backgroundColor: 'dimgray',
          height: '8%',
          width: '100%',
          alignContent: 'space-between',
          flexDirection: 'row',
          padding: 15,
          borderRadius: 20,
        }}>
        <View
          style={{
            justifyContent: 'space-evenly',
            alignContent: 'center',
            left: '7%',
          }}>
          <Ionicon name={'checkbox-outline'} color={'white'} size={22} />
        </View>
        <View style={styles.icon}>
          <Ionicon name={'brush'} color={'white'} size={22} />
        </View>
        <View style={styles.icon}>
          <Ionicon name={'mic-outline'} color={'white'} size={22} />
        </View>
        <View style={styles.icon}>
          <Ionicon name={'image'} color={'white'} size={22} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    justifyContent: 'space-evenly',
    alignContent: 'center',
    paddingLeft: 20,
  },
});
export default HomeScreen;
