import React, {useState} from 'react';
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

const Notes = ({navigation, route}) => {
  const [pinned, setPinned] = useState(false);
  const [reminder, setReminder] = useState('');
  const [archive, setArchive] = useState(false);
  const [title, setTitle] = useState(route.params?.editData?.Title || '');
  const [note, setNote] = useState(route.params?.editData?.Note || '');
  const [trash, setTrash] = useState(false);
  const [isList, setIsList] = useState(route.params?.List || false);
  const [active, setActive] = useState(false);
  const [list, setList] = useState(route.params?.editData?.List || []);

  const receiveId = route.params?.editId;

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
        toNavigateDashboard,
      );
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
    <SafeAreaView style={styles.background}>
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
              {active && (
                <CreateList
                  onPress={() => {
                    navigation.navigate('Notes');
                  }}
                  onChangeText={text => {
                    setList(text);
                  }}
                  value={list}
                />
              )}

              <TouchableOpacity
                style={[styles.label, {paddingLeft: PADDING.PRIMARY_PADDING}]}
                onPress={() => {
                  setActive(!active);
                }}>
                <AntDesign
                  name={'plus'}
                  size={SIZES.ICON_MEDIUM}
                  color={COLOR.TEXT_COLOR}
                />
                <Text style={styles.labelText}>Add item</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>

      {/* //Bottom-Bar ==> Start */}
      <NoteBottomBar
        trash={trash}
        trashPress={handleTrash}
        onPress={addLabel}
        plusPress={handleList}
      />

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
