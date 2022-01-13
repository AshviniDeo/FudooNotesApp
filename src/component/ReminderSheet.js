import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR, MARGIN, PADDING, SIZES, BORDER, HEIGHT} from '../utility/Theme';
import Modal from 'react-native-modal';
import {Button} from 'react-native-paper';

import useLocalisation from '../localisation/useLocalisation';

const ReminderSheet = ({setReminder, refReminder}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const dictonary = useLocalisation('EN');

  const toggelModal = () => {
    setIsVisible(!isVisible);
  };

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

    setReminder(time);
    hideDatePicker();
  };

  return (
    <View>
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
                <Text style={custome.dateText}>Pick a Date</Text>
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
              <View>
                <Button
                  style={custome.btnView}
                  mode="contained"
                  onPress={toggelModal}
                  loading={loading}
                  labelStyle={{color: COLOR.ACTIVE_COLOR}}>
                  Cancel
                </Button>
              </View>
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
    </View>
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

export default ReminderSheet;
