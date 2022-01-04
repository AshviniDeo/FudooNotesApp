import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLOR, SIZES, PADDING} from '../utility/Theme';
import {styles} from '../utility/StyleSheet';
import {TextInput} from 'react-native-paper';

const CreateList = ({
  handleChecked,
  onPress,
  onChangeText,
  value,
  removeItem,
  id,
  toggleCheckBox,
  name,
}) => {
  return (
    <View
      style={[
        styles.label,
        {
          paddingLeft: PADDING.PRIMARY_PADDING,
        },
      ]}>
      {!toggleCheckBox && (
        <MaterialCommunityIcons
          name="format-list-checks"
          size={SIZES.ICON_MEDIUM}
        />
      )}
      <View>
        {!toggleCheckBox ? (
          <TouchableOpacity style={styles.icon} onPress={handleChecked}>
            <MaterialCommunityIcons
              name="checkbox-blank-outline"
              size={SIZES.ICON_MEDIUM}
              color={COLOR.HEADING}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.icon} onPress={handleChecked}>
            <Ionicons
              name="checkbox"
              size={SIZES.ICON_MEDIUM}
              color={COLOR.PLACE_HOLDER_COLOR}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.icon}>
        {!toggleCheckBox ? (
          <TextInput
            style={styles.editList}
            placeholder=""
            onChangeText={text => {
              onChangeText(text, id);
            }}
            value={name}
            selectionColor={COLOR.ACTIVE_COLOR}
            underlineColor={COLOR.PLACE_HOLDER_COLOR}
            activeUnderlineColor={COLOR.PLACE_HOLDER_COLOR}
          />
        ) : (
          <Text
            style={[
              styles.checkedList,
              {
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
              },
            ]}>
            {name}
          </Text>
        )}
      </View>
      <View style={styles.icon}>
        {!toggleCheckBox && (
          <TouchableOpacity onPress={removeItem}>
            <Entypo name={'cross'} size={25} color={COLOR} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CreateList;
