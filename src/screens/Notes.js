import React, {useState, createContext, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import useLocalisation from '../localisation/useLocalisation';
import {createnote, updatenote} from '../services/NoteServices';
import {styles} from '../utility/StyleSheet';
import {
  COLOR,
  MARGIN,
  PADDING,
  SIZES,
  WIDTH,
  HEIGHT,
  BORDER,
} from '../utility/Theme';
import {TextInput} from 'react-native-paper';
import Modal from 'react-native-modal';
import NoteTopBar from '../component/NoteTopBar';
import NoteBottomBar from '../component/NoteBottomBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CreateList from '../component/CreateList';
import RBSheet from 'react-native-raw-bottom-sheet';
import {colors} from '../utility/StyleSheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';

export const LabelContext = createContext(null);
const Notes = ({navigation, route}) => {
  const [pinned, setPinned] = useState(route.params?.editData?.Pinned || false);
  const [reminder, setReminder] = useState('');
  const [archive, setArchive] = useState(
    route.params?.editData?.Archive || false,
  );
  const [title, setTitle] = useState(route.params?.editData?.Title || '');
  const [note, setNote] = useState(route.params?.editData?.Note || '');
  const [trash, setTrash] = useState(false);
  const [isList, setIsList] = useState(
    route.params?.editData?.IsList || false || route.params?.IsList,
  );
  const [list, setList] = useState(route.params?.editData?.List || []);
  const [checkedArr, setCheckedArr] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [bgColor, setBgColor] = useState(
    route.params?.editData?.BackgroundColor || '',
  );
  const labelsData = route.params?.labels || [];
  console.log(labelsData);
  //Modal
  const [isVisible, setIsVisible] = useState(false);
  const toggelModal = () => {
    setIsVisible(!isVisible);
  };
  //--+++--
  const tempArr = [...list];

  const checked = tempArr.filter(item => item.toggleCheckBox);
  const unChecked = tempArr.filter(item => !item.toggleCheckBox);

  const refPalette = useRef();
  const refReminder = useRef();
  const dictonary = useLocalisation('EN');
  const handleChecked = obj => {
    const index = checkedArr.findIndex(item => item === obj.id);
    if (index === -1) {
      setCheckedArr([...checkedArr, obj]);
    } else {
      const temp = [...checkedArr];
      temp.splice(index, 1);
      setCheckedArr(tempArr);
    }
  };

  const newColor = bgColor;
  const receiveId = route.params?.editId;

  const handleToggle = id => {
    let temp = [...list];
    temp.forEach(item => {
      if (item.id === id) {
        item.toggleCheckBox = !item.toggleCheckBox;
      }
    });
    setList(temp);
  };

  const removeItem = id => {
    let temp = [...list];
    temp = temp.filter(item => item.id !== id);
    setList(temp);
  };

  const handleText = (text, id) => {
    let temp = [...list];
    temp.forEach(item => {
      if (item.id === id) {
        item.name = text;
      }
    });
    setList(temp);
  };
  //date-Picker

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    // date = JSON.stringify(date);
    setReminder(date);

    hideDatePicker();
  };
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleTimeConfirm = time => {
    console.warn('A time has been picked: ', time);
    // time = JSON.stringify(time);
    setReminder(time);
    hideDatePicker();
  };
  console.log(reminder, '===>');
  //---+++--
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
        list,
        isList,
        bgColor,
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
        list,
        isList,
        bgColor,
        toNavigateDashboard,
      );

      if (reminder) handleNotification();
    }
  };

  const addLabel = () => {
    navigation.navigate('AddLabel');
  };
  const handlePinned = () => {
    setPinned(prev => {
      return !pinned;
    });
  };

  const handleArchive = () => {
    setArchive(prev => {
      return !archive;
    });
  };

  const handleTrash = () => {
    setTrash(prev => {
      return !trash;
    });
  };

  const handleList = () => {
    setIsList(prev => {
      return !isList;
    });
  };

  const handleNotification = (item, id) => {
    // PushNotification.localNotification({
    //   channelId: 'test-channel',
    //   title: 'Testing notification',
    //   message: item.Note,
    //   id: id,
    // });

    let data = reminder;

    // console.log('data=>>', moment(data));

    // data = data.map(time =>time);
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: 'Testing notification',
      message: title,
      date: data,
      allowWhileIdle: true,
    });
  };
  return (
    <SafeAreaView
      style={[
        styles.background,
        {
          backgroundColor: route.params?.editColor?.BackgroundColor || newColor,
        },
      ]}>
      {/* Header-Bar==>Start */}
      <NoteTopBar
        handlePress={() => {
          handlePress();
        }}
        pinned={pinned}
        pinnedPress={handlePinned}
        reminderPress={() => {
          refReminder.current.open();
        }}
        archive={archive}
        archivePress={handleArchive}
      />

      <RBSheet ref={refReminder} height={HEIGHT.FBSHEET}>
        <TouchableOpacity>
          <View style={[custome.moreSheet, {marginTop: MARGIN.PRIMARY_MARGIN}]}>
            <MaterialCommunityIcons
              name={'alarm'}
              size={SIZES.ICON_MEDIUM}
              color={COLOR.TEXT_COLOR}
            />
            <Text style={custome.moreText}>
              {dictonary.TOMORROW_MORNING_TEXT}
            </Text>
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
            <Text style={custome.moreText}>
              {' '}
              {dictonary.TOMORROW_AFTERNOON_TEXT}
            </Text>
            <Text style={custome.moreText}>3:00 PM</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={custome.moreSheet}>
            <MaterialCommunityIcons
              name={'alarm'}
              size={SIZES.ICON_MEDIUM}
              color={COLOR.TEXT_COLOR}
            />
            <Text style={custome.moreText}>
              {dictonary.TOMORROW_EVENING_TEXT}
            </Text>
            <Text style={custome.moreText}>Thu 6:00 PM</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggelModal}>
          <View style={custome.moreSheet}>
            <MaterialCommunityIcons
              name={'alarm'}
              size={SIZES.ICON_MEDIUM}
              color={COLOR.TEXT_COLOR}
            />
            <Text style={custome.moreText}>
              {dictonary.PICK_A_DATE_AND_TIME_TEXT}
            </Text>
          </View>
        </TouchableOpacity>
      </RBSheet>

      <View>
        <Modal
          isVisible={isVisible}
          animationIn={'bounceIn'}
          animationOut={'bounceOut'}
          onBackdropPress={toggelModal}>
          <View style={custome.modal}>
            <Text
              style={{
                fontSize: SIZES.LARGE_TEXT,
                paddingLeft: PADDING.SECONADARY_PADDING,
                color: COLOR.HEADING,
              }}>
              {dictonary.ADD_REMINDER_TEXT}
            </Text>
            <View>
              <TouchableOpacity
                style={custome.dateStyle}
                onPress={showDatePicker}>
                <Text style={custome.dateText}>{Date.now()}</Text>
                <FontAwesome name="calendar" size={SIZES.ICON_SMALL} />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={custome.dateStyle}
                onPress={showTimePicker}>
                <Text style={custome.dateText}>Pick a Time</Text>
                <MaterialIcons name="more-time" size={SIZES.ICON_SMALL} />
              </TouchableOpacity>
            </View>
            <View style={custome.btnView}>
              <TouchableOpacity>
                <Text style={custome.cancleBtn} onPress={toggelModal}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          themeVariant="light"
        />
      </View>
      <View>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
          themeVariant="light"
          timePickerModeAndroid="spinner"
        />
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
          right={isList && <TextInput.Icon name="table-column" />}
        />
        <ScrollView>
          {!isList ? (
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
          ) : (
            <View>
              {unChecked.map((item, index) => (
                <CreateList
                  key={index}
                  {...item}
                  removeItem={() => {
                    removeItem(item.id);
                  }}
                  toggleCheckBox={item.toggleCheckBox}
                  handleChecked={() => {
                    handleToggle(item.id);
                  }}
                  onChangeText={text => {
                    handleText(text, item.id);
                  }}
                />
              ))}

              <TouchableOpacity
                style={[styles.label, {paddingLeft: PADDING.PRIMARY_PADDING}]}
                onPress={() =>
                  setList([
                    ...list,
                    {name: '', id: list.length + 1, toggleCheckBox: false},
                  ])
                }>
                <AntDesign
                  name={'plus'}
                  size={SIZES.ICON_MEDIUM}
                  color={COLOR.TEXT_COLOR}
                />
                <Text style={styles.labelText}>Add item</Text>
              </TouchableOpacity>
              {checked.length !== 0 && (
                <View
                  style={[styles.label, {padding: PADDING.SECONADARY_PADDING}]}>
                  <AntDesign
                    style={styles.icon}
                    name="down"
                    size={SIZES.ICON_SMALL}
                    color={COLOR.TEXT_COLOR}
                  />
                  <Text style={[styles.icon, {color: COLOR.TEXT_COLOR}]}>
                    {checked.length} Checked item
                  </Text>
                </View>
              )}
              {checked.map((item, index) => (
                <CreateList
                  key={index}
                  {...item}
                  removeItem={() => {
                    removeItem(item.id);
                  }}
                  toggleCheckBox={item.toggleCheckBox}
                  handleChecked={() => {
                    handleToggle(item.id);
                  }}
                  onChangeText={text => {
                    handleText(text, item.id);
                  }}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </View>

      {/* //Bottom-Bar ==> Start */}
      <LabelContext.Provider value={{checkedArr, handleChecked}}>
        <NoteBottomBar
          trash={trash}
          trashPress={handleTrash}
          onPress={addLabel}
          plusPress={handleList}
          palettePress={() => {
            refPalette.current.open();
          }}
        />
        <RBSheet ref={refPalette} height={HEIGHT.BUTTON_HEIGHT}>
          <ScrollView horizontal>
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setBgColor(color)}
                style={[styles.paletteView, {backgroundColor: color}]}
              />
            ))}
          </ScrollView>
        </RBSheet>
      </LabelContext.Provider>
      {/* //Bottom-Bar ==>End */}
    </SafeAreaView>
  );
};
const custome = StyleSheet.create({
  dateStyle: {
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingTop: PADDING.PRIMARY_PADDING,
    paddingLeft: PADDING.SECONADARY_PADDING,
    borderBottomWidth: BORDER.LIGHT_BORDER,
    flexDirection: 'row',
  },
  dateText: {
    fontSize: SIZES.NOTE,
    paddingBottom: PADDING.SECONADARY_PADDING,
    justifyContent: 'flex-start',
  },
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
  titleInput: {
    alignContent: 'center',
    flexWrap: 'wrap',
    width: WIDTH.FULL_WIDTH,
  },

  note: {
    fontSize: SIZES.MEDIUM_TEXT,
    color: COLOR.TEXT_COLOR,
    margin: MARGIN.PRIMARY_MARGIN,
    backgroundColor: COLOR.TRANSPARENT,
  },
  titleText: {
    fontSize: SIZES.LARGE_TEXT,
    color: COLOR.TEXT_COLOR,
    margin: MARGIN.PRIMARY_MARGIN,
    backgroundColor: COLOR.TRANSPARENT,
  },
  noteCard: {
    flex: 0.9,
  },
  cancleBtn: {
    fontSize: SIZES.NOTE,
    fontWeight: 'bold',
    color: COLOR.ACTIVE_COLOR,
    marginTop: MARGIN.PRIMARY_MARGIN,
  },
  btnView: {
    flexDirection: 'row',
    paddingTop: PADDING.SECONADARY_PADDING,
    justifyContent: 'space-around',
  },

  modal: {
    flex: 0.3,
    alignContent: 'center',
    justifyContent: 'flex-start',
    backgroundColor: COLOR.PRIMARY,
    padding: PADDING.PRIMARY_PADDING,
    borderRadius: BORDER.ROUND_CORNER,
  },
});
export default Notes;
