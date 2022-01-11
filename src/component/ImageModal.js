import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {COLOR, PADDING, BORDER, SIZES} from '../utility/Theme';
import Ionicon from 'react-native-vector-icons/Ionicons';

const ImageModal = ({visible, onBackdropPress, takePhoto, choosePhoto}) => {
  return (
    <View>
      <Modal
        isVisible={visible}
        animationIn={'bounceIn'}
        animationOut={'bounceOut'}
        onBackdropPress={onBackdropPress}>
        <View style={styles.modal}>
          <Text style={styles.heading}>Add image</Text>
          <TouchableOpacity onPress={takePhoto}>
            <View style={styles.moreSheet}>
              <Ionicon
                name={'md-camera-sharp'}
                size={SIZES.ICON_MEDIUM}
                color={COLOR.TEXT_COLOR}
              />
              <Text style={styles.moreText}>Take Photo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={choosePhoto}>
            <View style={styles.moreSheet}>
              <Ionicon
                name={'md-images'}
                size={SIZES.ICON_MEDIUM}
                color={COLOR.TEXT_COLOR}
              />
              <Text style={styles.moreText}>Choose Image</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  modal: {
    flex: 0.2,
    backgroundColor: COLOR.PRIMARY,
    padding: PADDING.PRIMARY_PADDING,
    borderRadius: BORDER.ROUND_CORNER,
  },
  heading: {
    fontSize: SIZES.LARGE_TEXT,
    paddingLeft: PADDING.SECONADARY_PADDING,
    color: COLOR.TEXT_COLOR,
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
});
export default ImageModal;
