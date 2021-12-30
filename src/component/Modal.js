import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {BORDER, COLOR, PADDING} from '../utility/Theme';

const ModalScreen = ({visible, onBackdropPress}) => {
  return (
    <View>
      <Modal
        isVisible={visible}
        animationIn={'bounceIn'}
        animationOut={'bounceOut'}
        onBackdropPress={onBackdropPress}>
        <View style={styles.modal}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  modal: {
    flex: 0.5,
    alignContent: 'center',
    justifyContent: 'flex-start',
    backgroundColor: COLOR.PRIMARY,
    padding: PADDING.PRIMARY_PADDING,
    borderRadius: BORDER.ROUND_CORNER,
  },
});

export default ModalScreen;
