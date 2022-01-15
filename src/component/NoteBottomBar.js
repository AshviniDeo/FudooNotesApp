import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../utility/StyleSheet';
import {COLOR, HEIGHT, MARGIN, PADDING, SIZES, WIDTH} from '../utility/Theme';
import RBSheet from 'react-native-raw-bottom-sheet';
import useLocalisation from '../localisation/useLocalisation';

const NoteBottomBar = ({
  TrashPress,
  Trash,
  onPress,
  plusPress,
  palettePress,
}) => {
  const [currentDate, setCurrentDate] = useState('');
  const refMore = useRef();
  const dictonary = useLocalisation('EN');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes

    setCurrentDate(date + '/' + month + '/' + year + ' ' + hours + ':' + min);
  }, []);

  return (
    <View style={custome.bottom}>
      <View style={styles.icon}>
        <TouchableOpacity onPress={plusPress}>
          <AntDesign
            name={'plus'}
            size={SIZES.ICON_MEDIUM}
            color={COLOR.TEXT_COLOR}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.icon}>
        <TouchableOpacity onPress={palettePress}>
          <Ionicon
            name={'color-palette-outline'}
            size={SIZES.ICON_MEDIUM}
            color={COLOR.TEXT_COLOR}
          />
        </TouchableOpacity>
      </View>
      <View style={custome.date}>
        <Text style={custome.dateText}>
          {dictonary.EDITED_TEXT} {currentDate}
        </Text>
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
          <TouchableOpacity onPress={TrashPress}>
            <View style={custome.moreSheet}>
              <Ionicon
                name={'trash-outline'}
                size={SIZES.ICON_MEDIUM}
                color={Trash ? COLOR.ACTIVE_COLOR : COLOR.TEXT_COLOR}
              />
              <Text style={custome.moreText}>{dictonary.DELETE_TEXT}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress}>
            <View style={custome.moreSheet}>
              <MaterialIcons
                name={'label-outline'}
                size={SIZES.ICON_MEDIUM}
                color={COLOR.TEXT_COLOR}
              />
              <Text style={custome.moreText}>{dictonary.LABELS_TEXT}</Text>
            </View>
          </TouchableOpacity>
        </RBSheet>
      </View>
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
    backgroundColor: COLOR.HEADING,
  },
});
export default NoteBottomBar;
