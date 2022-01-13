import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from '../utility/StyleSheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLOR, SIZES} from '../utility/Theme';
import ImageModal from './ImageModal';
import ImagePicker from 'react-native-image-crop-picker';

const BottomBar = ({navigation, onPress, listPress, setImage}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [addImage, setAddImage] = useState('');
  const toggelModal = () => {
    setIsVisible(!isVisible);
  };

  const data = addImage;
  const handleNote = () => {
    navigation.navigate('Notes', {Image: data});
  };

  const takePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setAddImage(image.path);
    });
  };

  const choosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setAddImage(image.path);
    });
  };
  return (
    <View style={styles.bottomBar}>
      <View style={styles.bottomIcon}>
        <TouchableOpacity onPress={listPress}>
          <Ionicon
            style={styles.icon}
            name={'checkbox-outline'}
            color={COLOR.TEXT_COLOR}
            size={SIZES.ICON_MEDIUM}
          />
        </TouchableOpacity>
        <Ionicon
          style={styles.icon}
          name={'brush'}
          color={COLOR}
          size={SIZES.ICON_MEDIUM}
        />

        <Ionicon
          style={styles.icon}
          name={'mic-outline'}
          color={COLOR.TEXT_COLOR}
          size={SIZES.ICON_MEDIUM}
        />

        <TouchableOpacity onPress={toggelModal}>
          <Ionicon
            style={styles.icon}
            name={'image'}
            color={COLOR.TEXT_COLOR}
            size={SIZES.ICON_MEDIUM}
          />
        </TouchableOpacity>

        <ImageModal
          visible={isVisible}
          onBackdropPress={toggelModal}
          takePhoto={takePhoto}
          choosePhoto={choosePhoto}
          onPress={handleNote}
        />

        <TouchableOpacity style={styles.barButton} onPress={onPress}>
          <View style={styles.plus}>
            <AntDesign
              name={'plus'}
              size={SIZES.ICON_LARGE}
              color={COLOR.TEXT_COLOR}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomBar;
