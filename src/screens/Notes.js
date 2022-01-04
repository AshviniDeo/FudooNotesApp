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
import {COLOR, MARGIN, PADDING, SIZES, WIDTH, HEIGHT} from '../utility/Theme';
import {TextInput} from 'react-native-paper';
import NoteTopBar from '../component/NoteTopBar';
import NoteBottomBar from '../component/NoteBottomBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CreateList from '../component/CreateList';
import RBSheet from 'react-native-raw-bottom-sheet';
import {colors} from '../utility/StyleSheet';

export const LabelContext = createContext(null);
const Notes = ({navigation, route}) => {
  const [pinned, setPinned] = useState(false);
  const [reminder, setReminder] = useState('');
  const [archive, setArchive] = useState(false);
  const [title, setTitle] = useState(route.params?.editData?.Title || '');
  const [note, setNote] = useState(route.params?.editData?.Note || '');
  const [trash, setTrash] = useState(false);
  const [isList, setIsList] = useState(route.params?.editData?.IsList || false);
  const [list, setList] = useState(route.params?.editData?.List || []);
  const [checkedArr, setCheckedArr] = useState([]);
  const [bgColor, setBgColor] = useState(
    route.params?.editData?.BackgroundColor || '',
  );
  const tempArr = [...list];

  const checked = tempArr.filter(item => item.toggleCheckBox);
  const unChecked = tempArr.filter(item => !item.toggleCheckBox);

  const refPalette = useRef();

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
  console.log(bgColor, 'arrray');
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
    temp = temp.filter(item => item.id === id);
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
    }
  };

  const addLabel = () => {
    navigation.navigate('AddLabel', {handleChecked, checkedArr});
  };
  const handlePinned = () => {
    setPinned(prev => {
      return !pinned;
    });
  };

  const handleReminder = () => {
    setReminder(!reminder);
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
        reminderPress={handleReminder}
        archive={archive}
        archivePress={handleArchive}
      />

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
});
export default Notes;
