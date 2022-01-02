import React, {useRef} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {styles} from '../utility/StyleSheet';
import {SIZES, COLOR, WIDTH, HEIGHT, PADDING} from '../utility/Theme';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';

const NoteTopBar = ({
  handlePress,
  pinned,
  pinnedPress,
  reminder,
  reminderPress,
  archive,
  archivePress,
}) => {
  const refReminder = useRef();
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
        <TouchableOpacity onPress={pinnedPress}>
          <MaterialCommunityIcons
            name={'pin-outline'}
            size={SIZES.ICON_MEDIUM}
            color={pinned ? COLOR.ACTIVE_COLOR : COLOR.TEXT_COLOR}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            reminderPress(refReminder.current.open());
          }}>
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name={'bell-plus-outline'}
              size={SIZES.ICON_MEDIUM}
              color={COLOR.TEXT_COLOR}
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
        <TouchableOpacity onPress={archivePress}>
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
