import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import NoteCard from './NoteCard';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fetchArchiveData} from '../navigation/NoteServices';

const ArchiveScreen = ({navigation}) => {
  const [search, setSearch] = useState();
  const [active, setActive] = useState(false);
  const [noteData, setNoteData] = useState([]);
  const handlePress = () => {
    setActive(!active);
  };
  const fetchData = async () => {
    let data = await fetchArchiveData();
    setNoteData(data);
    console.log('===data ===');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

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
        }}>
        <View style={{alignItems: 'flex-start'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Ionicon name={'menu'} size={28} color={'white'} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Archive
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: '50%',
          }}>
          <TouchableOpacity
            onPress={() => {
              setActive(!active);
            }}>
            {active ? (
              <TextInput
                placeholder={'Search your notes'}
                placeholderTextColor={'white'}
                onChangeText={text => {
                  setSearch(text);
                }}
                value={search}
              />
            ) : (
              <Ionicon name="search" size={23} color="white" />
            )}
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
      </View>
      <View
        style={{
          height: '85%',
          width: '90%',
        }}>
        {noteData.length === 0 ? (
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              left: '10%',
              top: '40%',
            }}>
            <FontAwesome name={'archive'} size={100} color={'white'} />
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                alignItems: 'center',
                top: 15,
              }}>
              Your achived notes appear here
            </Text>
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              left: '5%',
            }}>
            <FlatList
              style={{
                width: '100%',
              }}
              data={noteData}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Notes', {
                      editData: item,
                      editId: item.id,
                    });
                  }}>
                  <NoteCard {...item} />
                </TouchableOpacity>
              )}
              numColumns={!active ? 1 : 2}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ArchiveScreen;
