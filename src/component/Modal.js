import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {BORDER, COLOR, MARGIN, PADDING, SIZES, WIDTH} from '../utility/Theme';
import Entypo from 'react-native-vector-icons/Entypo';
import {Avatar} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import {AuthContext} from '../navigation/AuthProvider';

const ModalScreen = ({
  visible,
  onBackdropPress,
  toggleModal,
  navigation,
  profileData,
  displayPicture,
  setDisplayPicture,
}) => {
  const {update, googleSignOut, signout} = useContext(AuthContext);

  const takePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      update(image.path);
      setDisplayPicture(image.path);
    });
  };

  const choosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setDisplayPicture(image.path);
      update(image.path);
    });
  };
  let userName;
  let email;
  console.log(profileData);
  if (profileData) {
    Object.values(profileData).forEach(item => {
      userName = item?.UserName || item?.name;
      email = item?.Email || item?.email;
      setDisplayPicture(item?.profileImage || item?.photo);
    });
  }

  return (
    <View>
      <Modal
        isVisible={visible}
        animationIn={'bounceIn'}
        animationOut={'bounceOut'}
        onBackdropPress={onBackdropPress}>
        <View style={styles.modal}>
          <View>
            <TouchableOpacity onPress={toggleModal}>
              <Entypo
                style={{paddingLeft: PADDING.PRIMARY_PADDING}}
                name={'cross'}
                size={SIZES.ICON_MEDIUM}
                color={COLOR}
              />
            </TouchableOpacity>
            <View style={styles.view}>
              <Text style={[styles.heading, {color: 'blue'}]}>F</Text>
              <Text style={[styles.heading, {color: 'red'}]}>u</Text>
              <Text style={[styles.heading, {color: 'yellow'}]}>n</Text>
              <Text style={[styles.heading, {color: 'green'}]}>D</Text>
              <Text style={[styles.heading, {color: 'red'}]}>o</Text>
              <Text style={[styles.heading, {color: 'blue'}]}>o</Text>
              <Text style={styles.heading}> Notes</Text>
            </View>
            <View>
              <View style={styles.avtar}>
                <Avatar.Image
                  size={SIZES.AVTAR}
                  source={{uri: displayPicture}}
                />
              </View>
              <View style={styles.avtar}>
                <Text style={styles.username}>{userName}</Text>
                <Text style={{color: COLOR.ACTIVE_COLOR}}>{email}</Text>
              </View>
            </View>
            {Object.values(profileData).map(item => !item?.idToken) && (
              <View style={styles.avtar}>
                <View style={styles.button}>
                  <TouchableOpacity onPress={takePhoto}>
                    <Text style={styles.button_text}>Take a Photo</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.button}>
                  <TouchableOpacity onPress={choosePhoto}>
                    <Text style={styles.button_text}>Upload a Photo</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {Object.values(profileData).map(item => item?.idToken) && (
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {
                    googleSignOut();
                    setDisplayPicture('');
                    signout();
                    email = '';
                    userName = '';
                  }}>
                  <Text style={styles.button_text}>Logout</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  username: {
    fontSize: SIZES.TITLE,
    color: COLOR.HEADING,
    fontWeight: 'bold',
  },
  button_text: {fontSize: 18, fontWeight: 'bold'},
  button: {
    width: WIDTH.SECONDARY_WIDTH,
    alignItems: 'center',
    backgroundColor: COLOR.SECONDARY,
    padding: PADDING.SECONADARY_PADDING,
    borderWidth: BORDER.MEDIUM_BORDER,
    borderRadius: BORDER.BORDER_RADIUS,
    borderColor: 'rgba(0,0,0,0.2)',
    margin: MARGIN.PRIMARY_MARGIN,
  },
  avtar: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: PADDING.SECONADARY_PADDING,
  },
  modal: {
    flex: 0.6,
    justifyContent: 'flex-start',
    backgroundColor: COLOR.PRIMARY,
    padding: PADDING.PRIMARY_PADDING,
    borderRadius: BORDER.ROUND_CORNER,
    alignContent: 'space-between',
  },
  heading: {
    fontSize: SIZES.ICON_MEDIUM,
    fontWeight: 'bold',
  },
  view: {
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default ModalScreen;
