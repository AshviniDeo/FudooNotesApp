import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import {styles} from './StyleSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {daleteLabel, updateLabel} from '../navigation/LabelServices';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLOR, SIZES} from './Theme';

const Label = props => {
  const [label, setlabel] = useState(props.Label);
  const [edit, setEdit] = useState(true);
  const handlePress = () => {
    setEdit(true);
    const labelData = label;
    const labelId = props.labelId;
    updateLabel(labelData, labelId).then(() => {
      props.fetchData();
    });
  };

  const onDeleteButton = () => {
    setEdit(true);
    const labelId = props.labelId;
    daleteLabel(labelId).then(() => {
      props.fetchData();
    });
  };

  return (
    <View>
      <View style={styles.labelView}>
        {edit ? (
          <MaterialCommunityIcons
            name="label-outline"
            size={SIZES.ICON_MEDIUM}
            color={COLOR.TEXT_COLOR}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              onDeleteButton();
            }}>
            <Ionicons
              name="trash-outline"
              size={SIZES.ICON_MEDIUM}
              color={COLOR.TEXT_COLOR}
            />
          </TouchableOpacity>
        )}
        <TextInput
          style={[styles.label, styles.lableInput]}
          onChangeText={text => {
            setlabel(text);
          }}
          value={label}
          onFocus={() => {
            setEdit(!edit);
          }}
        />

        {!edit ? (
          <TouchableOpacity
            onPress={() => {
              handlePress();
            }}>
            <Ionicons
              name="checkmark"
              size={SIZES.ICON_MEDIUM}
              color={COLOR.ACTIVE_COLOR}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setEdit(false);
            }}>
            <Ionicons
              name="md-pencil-sharp"
              size={SIZES.ICON_MEDIUM}
              color={COLOR.TEXT_COLOR}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Label;
