import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {styles} from '../utility/StyleSheet';
import {SIZES, COLOR, WIDTH, PADDING} from '../utility/Theme';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NoteTopBar = ({
  handlePress,
  Pinned,
  PinnedPress,
  Reminder,
  ReminderPress,
  Archive,
  ArchivePress,
}) => {
  return (
    <View style={styles.noteBar}>
      <View style={custome.topBar}>
        <TouchableOpacity onPress={handlePress}>
          <Ionicon
            name={'arrow-back'}
            size={SIZES.ICON_MEDIUM}
            color={COLOR.TEXT_COLOR}
          />
        </TouchableOpacity>
      </View>
      <View style={{width: WIDTH.HALF_WIDTH}} />
      <View style={custome.view}>
        <TouchableOpacity onPress={PinnedPress}>
          <MaterialCommunityIcons
            name={'pin-outline'}
            size={SIZES.ICON_MEDIUM}
            color={Pinned ? COLOR.ACTIVE_COLOR : COLOR.TEXT_COLOR}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={ReminderPress}>
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name={'bell-plus-outline'}
              size={SIZES.ICON_MEDIUM}
              color={COLOR.TEXT_COLOR}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={ArchivePress}>
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name={'archive-arrow-down-outline'}
              size={SIZES.ICON_MEDIUM}
              color={Archive ? COLOR.ACTIVE_COLOR : COLOR.TEXT_COLOR}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const custome = StyleSheet.create({
  topBar: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
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
  view: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'flex-end',
    paddingHorizontal: PADDING.PRIMARY_PADDING,
  },
});

export default NoteTopBar;
