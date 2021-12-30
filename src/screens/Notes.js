import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createnote, updatenote} from '../services/NoteServices';
import {styles} from '../utility/StyleSheet';
import {COLOR, HEIGHT, MARGIN, PADDING, SIZES, WIDTH} from '../utility/Theme';
import RBSheet from 'react-native-raw-bottom-sheet';
import {TextInput} from 'react-native-paper';

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
  const refMore = useRef();
  const refReminder = useRef();
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
              setReminder(refReminder.current.open());
            }}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name={'bell-plus-outline'}
                size={SIZES.ICON_MEDIUM}
                color={reminder ? COLOR.ACTIVE_COLOR : COLOR.TEXT_COLOR}
              />
            </View>
          </TouchableOpacity>
          <RBSheet ref={refReminder} height={HEIGHT.FBSHEET}>
            <TouchableOpacity>
              <View style={custome.moreSheet}>
                <MaterialCommunityIcons
                  name={'alarm'}
                  size={SIZES.ICON_MEDIUM}
                  color={COLOR.TEXT_COLOR}
                />
                <Text style={custome.moreText}>Tomorrow Morning</Text>
                <Text style={custome.moreText}>8:00 AM</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={custome.moreSheet}>
                <MaterialCommunityIcons
                  name={'alarm'}
                  size={SIZES.ICON_MEDIUM}
                  color={COLOR.TEXT_COLOR}
                />
                <Text style={custome.moreText}>Tomorrow Evening</Text>
                <Text style={custome.moreText}>6:00 PM</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={custome.moreSheet}>
                <MaterialCommunityIcons
                  name={'alarm'}
                  size={SIZES.ICON_MEDIUM}
                  color={COLOR.TEXT_COLOR}
                />
                <Text style={custome.moreText}>Thursday Morning</Text>
                <Text style={custome.moreText}>Thu 8:00 AM</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={custome.moreSheet}>
                <MaterialCommunityIcons
                  name={'alarm'}
                  size={SIZES.ICON_MEDIUM}
                  color={COLOR.TEXT_COLOR}
                />
                <Text style={custome.moreText}>Pick a date & time</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={custome.moreSheet}>
                <MaterialIcons
                  name={'location-pin'}
                  size={SIZES.ICON_MEDIUM}
                  color={COLOR.TEXT_COLOR}
                />
                <Text style={custome.moreText}>Pick a place</Text>
              </View>
            </TouchableOpacity>
          </RBSheet>
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
        </View>
      </View>
      {/* //Header-Bar ===>End */}

      <View style={custome.noteCard}>
        <TextInput
          style={custome.titleText}
          label={'Title'}
          onChangeText={text => {
            setTitle(text);
          }}
          value={title}
          editable
          maxLength={40}
          underlineColor={COLOR.TRANSPARENT}
          activeUnderlineColor={COLOR.TRANSPARENT}
          selectionColor={COLOR.TEXT_COLOR}
        />
        <ScrollView>
          <TextInput
            style={custome.note}
            label={'Note'}
            onChangeText={text => {
              setNote(text);
            }}
            value={note}
            editable
            multiline
            underlineColor={COLOR.TRANSPARENT}
            activeUnderlineColor={COLOR.TEXT_COLOR}
            selectionColor={COLOR.TEXT_COLOR}
          />
        </ScrollView>
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
              refMore.current.open();
            }}>
            <Feather
              name={'more-vertical'}
              size={SIZES.ICON_MEDIUM}
              color={COLOR.TEXT_COLOR}
            />
          </TouchableOpacity>
          <RBSheet ref={refMore} height={HEIGHT.BUTTON_HEIGHT}>
            <TouchableOpacity
              onPress={() => {
                setTrash(prev => {
                  return !trash;
                });
              }}>
              <View style={custome.moreSheet}>
                <Ionicon
                  name={'trash-outline'}
                  size={SIZES.ICON_MEDIUM}
                  color={trash ? COLOR.ACTIVE_COLOR : COLOR.TEXT_COLOR}
                />
                <Text style={custome.moreText}>Delete</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddLabel');
              }}>
              <View style={custome.moreSheet}>
                <MaterialIcons
                  name={'label-outline'}
                  size={SIZES.ICON_MEDIUM}
                  color={COLOR.TEXT_COLOR}
                />
                <Text style={custome.moreText}>Labels</Text>
              </View>
            </TouchableOpacity>
          </RBSheet>
        </View>
      </View>

      {/* //Bottom-Bar ==>End */}
    </View>
  );
};
const custome = StyleSheet.create({
  moreText: {
    fontSize: SIZES.MEDIUM_TEXT,
    paddingHorizontal: PADDING.PRIMARY_PADDING,
    color: COLOR.TEXT_COLOR,
  },
  moreSheet: {
    padding: PADDING.RAW_SHEET_PADDING,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  noteCard: {
    flex: 0.9,
    alignContent: 'center',
  },
  bottomBar: {
    flex: 0.1,
  },
  more: {
    justifyContent: 'flex-end',
    paddingLeft: PADDING.BOTTOM_PADDING,
    alignContent: 'center',
    paddingBottom: PADDING.PRIMARY_PADDING,
    paddingRight: PADDING.SECONADARY_PADDING,
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
    paddingHorizontal: PADDING.PRIMARY_PADDING,
  },
  dateText: {
    color: COLOR.TEXT_COLOR,
    alignItems: 'center',
    alignSelf: 'center',
  },
  note: {
    fontSize: SIZES.MEDIUM_TEXT,
    color: COLOR.TEXT_COLOR,
    margin: MARGIN.PRIMARY_MARGIN,
    backgroundColor: COLOR.TRANSPARENT,
  },
  window: {
    flex: SIZES.FLEX,
    margin: MARGIN.PRIMARY_MARGIN,
    alignContent: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: SIZES.LARGE_TEXT,
    color: COLOR.TEXT_COLOR,
    margin: MARGIN.PRIMARY_MARGIN,
    backgroundColor: COLOR.TRANSPARENT,
  },
  rawSheet: {
    flex: SIZES.FLEX,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
export default Notes;
