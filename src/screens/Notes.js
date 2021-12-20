import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {createnote, updatenote} from '../navigation/NoteServices';
import {styles} from '../utility/StyleSheet';

const Notes = ({navigation, route}) => {
  const [pinned, setPinned] = useState(false);
  const [reminder, setReminder] = useState('');
  const [archive, setArchive] = useState(false);
  const [title, setTitle] = useState(route.params?.editData?.Title || '');
  const [note, setNote] = useState(route.params?.editData?.Note || '');
  const [trash, setTrash] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const receiveId = route.params?.editId;
  const COLOR = 'rgba(0,0,0,0.8)';
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes

    setCurrentDate(date + '/' + month + '/' + year + ' ' + hours + ':' + min);
  }, []);
  const toNavigateDashboard = () => {
    navigation.navigate('Dashboard');
  };
  const handlePress = () => {
    if (route.params?.editData) {
      updatenote(
        title,
        note,
        archive,
        pinned,
        reminder,
        trash,
        receiveId,
        toNavigateDashboard,
      );
      console.log('data update');
    } else {
      createnote(title, note, archive, pinned, reminder, toNavigateDashboard);
    }
  };
  return (
    <View style={styles.background}>
      {/* Header-Bar==>Start */}
      <View style={styles.noteBar}>
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
          }}>
          <TouchableOpacity
            onPress={() => {
              handlePress();
            }}>
            <Ionicon name={'arrow-back'} size={28} color={COLOR} />
          </TouchableOpacity>
        </View>
        <View style={{width: '55%'}} />
        <View
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              setPinned(prev => {
                return !pinned;
              });
            }}>
            <MaterialCommunityIcons
              name={'pin-outline'}
              size={28}
              color={pinned ? 'gray' : COLOR}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setReminder(prev => {
                return reminder;
              });
            }}>
            <View style={{paddingLeft: 15}}>
              <MaterialCommunityIcons
                name={'bell-plus-outline'}
                size={28}
                color={reminder ? 'gray' : COLOR}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setArchive(prev => {
                return !archive;
              });
            }}>
            <View style={{paddingLeft: 15}}>
              <MaterialCommunityIcons
                name={'archive-arrow-down-outline'}
                size={28}
                color={archive ? 'gray' : COLOR}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* //Header-Bar ===>End */}

      <View
        style={{
          paddingLeft: 15,
          flexWrap: 'wrap',
          flex: 3,
        }}>
        <View
          style={{
            height: '10%',
            alignContent: 'center',
            flexWrap: 'wrap',
            width: '90%',
          }}>
          <TouchableOpacity>
            <TextInput
              style={{fontSize: 22, color: COLOR}}
              placeholder={'Title'}
              placeholderTextColor="gray"
              onChangeText={text => {
                setTitle(text);
              }}
              value={title}
              editable
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            flexWrap: 'wrap',
          }}>
          <TouchableOpacity>
            <TextInput
              style={{fontSize: 16, color: 'gray'}}
              placeholder={'Note'}
              placeholderTextColor="gray"
              onChangeText={text => {
                setNote(text);
              }}
              value={note}
              editable
              multiline
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* //Bottom-Bar ==> Start */}
      <View
        style={{
          justifyContent: 'flex-start',
          alignContent: 'center',
          height: '5%',
          flexDirection: 'row',
        }}>
        <View style={{justifyContent: 'flex-start', paddingLeft: 15}}>
          <AntDesign name={'plus'} size={22} color={COLOR} />
        </View>
        <View style={{justifyContent: 'flex-start', paddingLeft: 15}}>
          <Ionicon name={'color-palette-outline'} size={22} color={COLOR} />
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            paddingLeft: 15,
            width: '70%',
            alignContent: 'center',
          }}>
          <Text
            style={{color: {COLOR}, alignItems: 'center', alignSelf: 'center'}}>
            Edited {currentDate}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            paddingLeft: 15,
            alignContent: 'center',
            bottom: 10,
          }}>
          <Feather name={'more-vertical'} size={22} color={COLOR} />
        </View>
      </View>
      {/* //Bottom-Bar ==>End */}
    </View>
  );
};

export default Notes;
