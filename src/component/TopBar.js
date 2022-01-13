import React, {useContext, useState} from 'react';
import {View, TouchableOpacity, Text, TextInput} from 'react-native';
import {styles} from '../utility/StyleSheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLOR, SIZES} from '../utility/Theme';
import ModalScreen from '../component/Modal';
import useLocalisation from '../localisation/useLocalisation';
import {Avatar} from 'react-native-paper';

const TopBar = ({
  menuPress,
  value,
  onSearch,
  text,
  onPress,
  icon,
  searchIcon,
  navigation,
  profileData,
}) => {
  const [toggle, setToggle] = useState(searchIcon);
  const [isVisible, setIsVisible] = useState(false);
  const [displayPicture, setDisplayPicture] = useState('');

  const toggelModal = () => {
    setIsVisible(!isVisible);
  };
  const dictonary = useLocalisation('EN');
  return (
    <View style={styles.topBar}>
      <View>
        <TouchableOpacity onPress={menuPress}>
          <Ionicon
            name={'menu'}
            size={SIZES.TOPBAR_ICON}
            color={COLOR.TEXT_COLOR}
          />
        </TouchableOpacity>
      </View>
      {!toggle && (
        <View>
          <Text style={styles.title}>{text}</Text>
        </View>
      )}
      <View>
        {toggle ? (
          <TextInput
            style={styles.searchInput}
            placeholder={dictonary.SEARCH_BAR_TEXT}
            placeholderTextColor={COLOR.PLACE_HOLDER_COLOR}
            onChangeText={onSearch}
            value={value}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              setToggle(!toggle);
            }}>
            <Ionicon
              name="search"
              size={SIZES.ICON_MEDIUM}
              color={COLOR.TEXT_COLOR}
            />
          </TouchableOpacity>
        )}
      </View>
      <View>
        <TouchableOpacity onPress={onPress}>
          {icon ? (
            <FontAwesome
              name={'tasks'}
              size={SIZES.ICON_MEDIUM}
              color={COLOR.TEXT_COLOR}
            />
          ) : (
            <Ionicon
              name={'ios-grid-outline'}
              size={SIZES.ICON_MEDIUM}
              color={COLOR.TEXT_COLOR}
            />
          )}
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={toggelModal}>
          {
            <Avatar.Image
              size={SIZES.TOPBAR_ICON}
              source={{uri: displayPicture}}
            />
          }
        </TouchableOpacity>
        <ModalScreen
          visible={isVisible}
          onBackdropPress={toggelModal}
          toggleModal={toggelModal}
          navigation={navigation}
          profileData={profileData}
          displayPicture={displayPicture}
          setDisplayPicture={setDisplayPicture}
        />
      </View>
    </View>
  );
};

export default TopBar;
