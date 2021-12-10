import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
const Notes = ({navigation}) => {
  const [pinned, setPinned] = useState(false);
  const [reminder, setReminder] = useState(false);
  const [archive, setArchive] = useState(false);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes

    setCurrentDate(date + '/' + month + '/' + year + ' ' + hours + ':' + min);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'black', opacity: 0.9}}>
      //Header-Bar==>Start
      <View
        style={{
          justifyContent: 'flex-start',
          height: '8%',
          width: '100%',
          flexDirection: 'row',
          alignContent: 'space-between',
          alignItems: 'center',
          left: 15,
        }}>
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicon name={'arrow-back'} size={28} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={{width: '55%'}}></View>
        <View
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              setPinned(!pinned);
            }}>
            <MaterialCommunityIcons
              name={'pin-outline'}
              size={28}
              color={pinned ? 'blue' : 'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setReminder(!reminder);
            }}>
            <View style={{paddingLeft: 15}}>
              <MaterialCommunityIcons
                name={'bell-plus-outline'}
                size={28}
                color={reminder ? 'blue' : 'white'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setArchive(!archive);
            }}>
            <View style={{paddingLeft: 15}}>
              <MaterialCommunityIcons
                name={'archive-arrow-down-outline'}
                size={28}
                color={archive ? 'blue' : 'white'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      //Header-Bar ===>End
      <View
        style={{
          paddingLeft: 15,
          flexWrap: 'wrap',
          height: '85%',
          flexDirection: 'column',
        }}>
        <View
          style={{
            height: '10%',
            alignContent: 'center',
            flexWrap: 'wrap',
            width: '100%',
          }}>
          <TouchableOpacity>
            <TextInput
              style={{fontSize: 22}}
              placeholder={'Title'}
              placeholderTextColor="white"
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
              style={{fontSize: 16}}
              placeholder={'Note'}
              placeholderTextColor="white"
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
      //Bottom-Bar ==> Start
      <View
        style={{
          justifyContent: 'flex-start',
          alignContent: 'center',
          height: '5%',
          flexDirection: 'row',
        }}>
        <View style={{justifyContent: 'flex-start', paddingLeft: 15}}>
          <FontAwesome name={'plus-square-o'} size={22} color="white" />
        </View>
        <View style={{justifyContent: 'flex-start', paddingLeft: 15}}>
          <Ionicon name={'color-palette-outline'} size={22} color="white" />
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            paddingLeft: 15,
            width: '70%',
            alignContent: 'center',
          }}>
          <Text style={{color: 'white', alignItems: 'center'}}>
            Edited {currentDate}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            paddingLeft: 15,
            alignContent: 'center',
          }}>
          <Feather name={'more-vertical'} size={22} color="white" />
        </View>
      </View>
      //Bottom-Bar ==>End
    </View>
  );
};

export default Notes;
