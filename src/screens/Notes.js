import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';

import {createnote, updatenote} from '../services/NoteServices';
import {styles} from '../utility/StyleSheet';
import {COLOR, MARGIN, SIZES, WIDTH} from '../utility/Theme';
import {TextInput} from 'react-native-paper';
import NoteTopBar from '../component/NoteTopBar';
import NoteBottomBar from '../component/NoteBottomBar';

const Notes = ({navigation, route}) => {
  const [pinned, setPinned] = useState(false);
  const [reminder, setReminder] = useState('');
  const [archive, setArchive] = useState(false);
  const [title, setTitle] = useState(route.params?.editData?.Title || '');
  const [note, setNote] = useState(route.params?.editData?.Note || '');
  const [trash, setTrash] = useState(false);

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
      <NoteBottomBar
        trash={trash}
        trashPress={handleTrash}
        onPress={addLabel}
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
});
export default Notes;
