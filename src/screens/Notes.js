import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {createnote, updatenote} from '../services/NoteServices';
import {styles} from '../utility/StyleSheet';
import {COLOR, HEIGHT, PADDING, SIZES, WIDTH} from '../utility/Theme';
import RBSheet from 'react-native-raw-bottom-sheet';

const Notes = ({navigation, route}) => {
  const [pinned, setPinned] = useState(false);
  const [reminder, setReminder] = useState('');
  const [archive, setArchive] = useState(false);
  const [title, setTitle] = useState(route.params?.editData?.Title || '');
  const [note, setNote] = useState(route.params?.editData?.Note || '');
  const [trash, setTrash] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const receiveId = route.params?.editId;

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
  console.log(receiveId);
  const handlePress = () => {
    if (receiveId) {
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
    } else {
      createnote(
        title,
        note,
        archive,
        pinned,
        reminder,
        trash,
        toNavigateDashboard,
      );
    }
  };

  const onMoreOption = () => {
    <View></View>;
  };
  return (
    <View style={styles.background}>
      {/* Header-Bar==>Start */}
      <View style={styles.noteBar}>
        <View style={custome.topBar}>
          <TouchableOpacity
            onPress={() => {
              handlePress();
            }}>
            <Ionicon
              name={'arrow-back'}
              size={SIZES.ICON_MEDIUM}
              color={COLOR.TEXT_COLOR}
            />
          </TouchableOpacity>
        </View>
        <View style={{width: WIDTH.HALF_WIDTH}} />
        <View style={custome.view}>
          <TouchableOpacity
            onPress={() => {
              setPinned(prev => {
                return !pinned;
              });
            }}>
            <MaterialCommunityIcons
              name={'pin-outline'}
              size={SIZES.ICON_MEDIUM}
              color={pinned ? COLOR.ACTIVE_COLOR : COLOR.TEXT_COLOR}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setReminder(prev => {
                return reminder;
              });
            }}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name={'bell-plus-outline'}
                size={SIZES.ICON_MEDIUM}
                color={reminder ? COLOR.ACTIVE_COLOR : COLOR.TEXT_COLOR}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setArchive(prev => {
                return !archive;
              });
            }}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name={'archive-arrow-down-outline'}
                size={SIZES.ICON_MEDIUM}
                color={archive ? COLOR.ACTIVE_COLOR : COLOR.TEXT_COLOR}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTrash(prev => {
                return !trash;
              });
            }}>
            <View style={styles.icon}>
              <Ionicon
                name={'trash-outline'}
                size={SIZES.ICON_MEDIUM}
                color={trash ? COLOR.ACTIVE_COLOR : COLOR.TEXT_COLOR}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* //Header-Bar ===>End */}

      <View style={custome.window}>
        <View style={custome.titleInput}>
          <TouchableOpacity>
            <TextInput
              style={custome.titleText}
              placeholder={'Title'}
              placeholderTextColor={COLOR.PLACE_HOLDER_COLOR}
              onChangeText={text => {
                setTitle(text);
              }}
              value={title}
              editable
              maxLength={40}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <TextInput
              style={custome.note}
              placeholder={'Note'}
              placeholderTextColor={COLOR.PLACE_HOLDER_COLOR}
              onChangeText={text => {
                setNote(text);
              }}
              value={note}
              editable
              multiline={true}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* //Bottom-Bar ==> Start */}
      <View style={custome.bottom}>
        <View style={styles.icon}>
          <AntDesign
            name={'plus'}
            size={SIZES.ICON_MEDIUM}
            color={COLOR.TEXT_COLOR}
          />
        </View>
        <View style={styles.icon}>
          <Ionicon
            name={'color-palette-outline'}
            size={SIZES.ICON_MEDIUM}
            color={COLOR.TEXT_COLOR}
          />
        </View>
        <View style={custome.date}>
          <Text style={custome.dateText}>Edited {currentDate}</Text>
        </View>
        <View style={custome.more}>
          <TouchableOpacity
            onPress={() => {
              onMoreOption();
            }}>
            <Feather
              name={'more-vertical'}
              size={SIZES.ICON_MEDIUM}
              color={COLOR.TEXT_COLOR}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* //Bottom-Bar ==>End */}
    </View>
  );
};
const custome = StyleSheet.create({
  more: {
    justifyContent: 'flex-end',
    paddingLeft: PADDING.SECONADARY_PADDING,
    alignContent: 'center',
    paddingBottom: PADDING.PRIMARY_PADDING,
  },
  date: {
    justifyContent: 'center',
    paddingLeft: PADDING.NEGATIVE_PADDING,
    width: WIDTH.DATE,
    alignContent: 'center',
    paddingBottom: PADDING.SECONADARY_PADDING,
  },
  bottom: {
    justifyContent: 'flex-start',
    alignContent: 'center',
    height: HEIGHT.BAR_HEIGHT,
    flexDirection: 'row',
  },
  titleInput: {
    height: HEIGHT.SECTION_HEIGHT,
    alignContent: 'center',
    flexWrap: 'wrap',
    width: WIDTH.FULL_WIDTH,
  },
  topBar: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  view: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'flex-end',
  },
  dateText: {
    color: COLOR.TEXT_COLOR,
    alignItems: 'center',
    alignSelf: 'center',
  },
  note: {fontSize: SIZES.NOTE, color: COLOR.PLACE_HOLDER_COLOR},
  window: {
    flex: SIZES.FLEX,
    padding: PADDING.PRIMARY_PADDING,
  },
  titleText: {
    fontSize: SIZES.LARGE_TEXT,
    color: COLOR.TEXT_COLOR,
  },
  rawSheet: {
    flex: SIZES.FLEX,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
export default Notes;
