import React, {useState, createContext, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';

import {createnote, updatenote} from '../services/NoteServices';
import {styles} from '../utility/StyleSheet';
import {COLOR, MARGIN, PADDING, SIZES, WIDTH} from '../utility/Theme';
import {TextInput} from 'react-native-paper';
import NoteTopBar from '../component/NoteTopBar';
import NoteBottomBar from '../component/NoteBottomBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CreateList from '../component/CreateList';
import PushNotification from 'react-native-push-notification';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import ColorPalette from '../component/ColorPalette';
import ReminderSheet from '../component/ReminderSheet';

export const LabelContext = createContext(null);
const Notes = ({navigation, route}) => {
  const [Pinned, setPinned] = useState(route.params?.editData?.Pinned || false);
  const [Reminder, setReminder] = useState('');
  const [Archive, setArchive] = useState(
    route.params?.editData?.Archive || false,
  );
  const [Title, setTitle] = useState(route.params?.editData?.Title || '');
  const [Note, setNote] = useState(route.params?.editData?.Note || '');
  const [Trash, setTrash] = useState(route.params?.editData?.Trash || false);
  const [IsList, setIsList] = useState(route.params?.IsList || false);
  const [List, setList] = useState(route.params?.editData?.List || []);
  const [checkedArr, setCheckedArr] = useState([]);
  const [BackgroundColor, setBackgroundColor] = useState(
    route.params?.editData?.BackgroundColor || '',
  );
  // const labelsData = route.params?.labels || [];

  const tempArr = [...List];

  const checked = tempArr.filter(item => item.toggleCheckBox);
  const unChecked = tempArr.filter(item => !item.toggleCheckBox);

  const refPalette = useRef();
  const refReminder = useRef();

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

  const newColor = BackgroundColor;
  const receiveId = route.params?.editId;

  const handleToggle = id => {
    let temp = [...List];
    temp.forEach(item => {
      if (item.id === id) {
        item.toggleCheckBox = !item.toggleCheckBox;
      }
    });
    setList(temp);
  };

  const removeItem = id => {
    let temp = [...List];
    temp = temp.filter(item => item.id !== id);
    setList(temp);
  };

  const handleText = (text, id) => {
    let temp = [...List];
    temp.forEach(item => {
      if (item.id === id) {
        item.name = text;
      }
    });
    setList(temp);
  };

  const toNavigateDashboard = () => {
    navigation.navigate('Dashboard');
  };
  const getId = () => uuidv4();
  const id = getId();

  const handlePress = (changeData = {}) => {
    const noteId = receiveId || getId();
    const noteData = {
      Title,
      Note,
      Archive,
      Pinned,
      Reminder: JSON.stringify(Reminder),
      Trash,
      List,
      IsList,
      BackgroundColor,
      ...changeData,
    };
    if (receiveId) {
      updatenote(noteData, noteId, toNavigateDashboard);
    } else {
      createnote(noteId, noteData, toNavigateDashboard);
      if (Reminder) {
        handleNotification();
      }
    }
  };

  const addLabel = () => {
    navigation.navigate('AddLabel');
  };
  const handlePinned = () => {
    setPinned(prev => {
      return !Pinned;
    });
  };

  const handleArchive = () => {
    setArchive(prev => {
      return !Archive;
    });
  };

  const handleTrash = () => {
    setTrash(prev => {
      return !Trash;
    });
  };

  const handleList = () => {
    setIsList(prev => {
      return !IsList;
    });
  };

  const handleNotification = (item, id) => {
    let data = Reminder;

    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      Title: 'Testing notification',
      message: Title,
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
        Pinned={Pinned}
        PinnedPress={handlePinned}
        ReminderPress={() => {
          refReminder.current.open();
        }}
        Archive={Archive}
        ArchivePress={handleArchive}
      />

      <ReminderSheet setReminder={setReminder} refReminder={refReminder} />

      {/* //Header-Bar ===>End */}

      <View style={custome.NoteCard}>
        <TextInput
          style={custome.TitleText}
          label={'Title'}
          onChangeText={text => {
            setTitle(text);
          }}
          value={Title}
          editable
          maxLength={40}
          underlineColor={COLOR.TRANSPARENT}
          activeUnderlineColor={COLOR.TRANSPARENT}
          selectionColor={COLOR.TEXT_COLOR}
          right={IsList && <TextInput.Icon name="table-column" />}
        />
        <ScrollView>
          {!IsList ? (
            <TextInput
              style={custome.Note}
              label={'Note'}
              onChangeText={text => {
                setNote(text);
              }}
              value={Note}
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
                    ...List,
                    {name: '', id: List.length + 1, toggleCheckBox: false},
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
          Trash={Trash}
          TrashPress={handleTrash}
          onPress={addLabel}
          plusPress={handleList}
          palettePress={() => {
            refPalette.current.open();
          }}
        />
        <ColorPalette
          refPalette={refPalette}
          setBackgroundColor={setBackgroundColor}
        />
      </LabelContext.Provider>
      {/* //Bottom-Bar ==>End */}
    </SafeAreaView>
  );
};
const custome = StyleSheet.create({
  TitleInput: {
    alignContent: 'center',
    flexWrap: 'wrap',
    width: WIDTH.FULL_WIDTH,
  },

  Note: {
    fontSize: SIZES.MEDIUM_TEXT,
    color: COLOR.TEXT_COLOR,
    margin: MARGIN.PRIMARY_MARGIN,
    backgroundColor: COLOR.TRANSPARENT,
  },
  TitleText: {
    fontSize: SIZES.LARGE_TEXT,
    color: COLOR.TEXT_COLOR,
    margin: MARGIN.PRIMARY_MARGIN,
    backgroundColor: COLOR.TRANSPARENT,
  },
  NoteCard: {
    flex: 0.9,
  },
});
export default Notes;
