import React, {useState, useRef} from 'react';
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
import {Avatar, TextInput} from 'react-native-paper';
import NoteTopBar from '../component/NoteTopBar';
import NoteBottomBar from '../component/NoteBottomBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CreateList from '../component/CreateList';
import PushNotification from 'react-native-push-notification';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import ColorPalette from '../component/ColorPalette';
import ReminderSheet from '../component/ReminderSheet';
import moment from 'moment';
import {Chip} from 'react-native-paper';
import {widthPercentageToDP} from '../utility/DynamicDimension';
import {setlabel, updateLabel} from '../services/LabelServices';

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
  const [BackgroundColor, setBackgroundColor] = useState(
    route.params?.editData?.BackgroundColor || '',
  );
  const isImageNote =
    route.params?.isImageNote || route.params?.editData?.isImageNote || false;

  const labelData =
    route.params?.Labels || route.params?.editData?.labelData || [];
  console.log(Reminder);
  const image = route.params?.imageData || route.params?.editData?.image || '';

  const tempArr = [...List];

  const checked = tempArr.filter(item => item.toggleCheckBox);
  const unChecked = tempArr.filter(item => !item.toggleCheckBox);

  const refPalette = useRef();
  const refReminder = useRef();

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

  const handlePress = (changeData = {}) => {
    const noteId = receiveId || getId();
    const noteData = {
      Title,
      Note,
      Archive,
      Pinned,
      Reminder: Reminder.toISOString?.() || '',
      Trash,
      List,
      IsList,
      BackgroundColor,
      labelData,
      isImageNote,
      image,
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
    console.log(noteData);
    if (labelData) {
      labelData.forEach(item => {
        setlabel(item.labelId, noteId);
      });
    }
  };

  const addLabel = () => {
    navigation.navigate('AddLabel', {Labels: labelData});
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
    let data = new Date(Reminder);

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

      <View style={styles.window}>
        {isImageNote && (
          <View style={custome.image}>
            <Avatar.Image
              size={widthPercentageToDP('70%')}
              source={{uri: image}}
            />
          </View>
        )}

        <View style={custome.NoteCard}>
          <TextInput
            style={custome.TitleText}
            placeholder={'Title'}
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
                placeholder={'Note'}
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
                    style={[
                      styles.label,
                      {padding: PADDING.SECONADARY_PADDING},
                    ]}>
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
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {labelData &&
                labelData.map(item => (
                  <View>
                    <Chip style={custome.chip} icon={'label'}>
                      {item.label}
                    </Chip>
                  </View>
                ))}
              <View>
                {Reminder ? (
                  <Chip
                    style={[custome.chip, {width: widthPercentageToDP('50%')}]}
                    icon={'alarm'}>
                    <Text> {moment(Reminder).format('MMM DD hh:mm a')}</Text>
                  </Chip>
                ) : null}
              </View>
            </View>
          </ScrollView>
        </View>

        {/* //Bottom-Bar ==> Start */}

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
      </View>

      {/* //Bottom-Bar ==>End */}
    </SafeAreaView>
  );
};
const custome = StyleSheet.create({
  image: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
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
  chip: {
    padding: PADDING.SECONADARY_PADDING,
    margin: MARGIN.PRIMARY_MARGIN,
    alignContent: 'center',
    justifyContent: 'center',
    color: COLOR.HEADING,
    fontSize: SIZES.SMALL_TEXT,
    width: widthPercentageToDP('30%'),
  },
});
export default Notes;
