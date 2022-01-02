import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLOR, SIZES, PADDING, WIDTH} from '../utility/Theme';
import {styles} from '../utility/StyleSheet';
import {TextInput} from 'react-native-paper';

const CreateList = ({onPress, onChangeText, value}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [active, setActive] = useState(false);
  return (
    <View
      style={[
        styles.label,
        {
          paddingLeft: PADDING.PRIMARY_PADDING,
        },
      ]}>
      <MaterialCommunityIcons
        name="format-list-checks"
        size={SIZES.ICON_MEDIUM}
      />
      <View>
        {!toggleCheckBox ? (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              setToggleCheckBox(!toggleCheckBox);
            }}>
            <MaterialCommunityIcons
              name="checkbox-blank-outline"
              size={SIZES.ICON_MEDIUM}
              color={COLOR.HEADING}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              setToggleCheckBox(!toggleCheckBox);
            }}>
            <Ionicons
              style={styles.icon}
              name="checkbox"
              size={SIZES.ICON_MEDIUM}
              color={COLOR.PLACE_HOLDER_COLOR}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.icon}>
        <TextInput
          style={styles.editList}
          placeholder=""
          onChangeText={onChangeText}
          value={value}
          selectionColor={COLOR.ACTIVE_COLOR}
          underlineColor={COLOR.TRANSPARENT}
          activeUnderlineColor={COLOR.TRANSPARENT}
        />
      </View>
      <View style={styles.icon}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            onPress;
            setActive(!active);
          }}>
          <Entypo name={'cross'} size={25} color={COLOR} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateList;
