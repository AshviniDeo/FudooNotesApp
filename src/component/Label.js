import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput, Text} from 'react-native';
import {styles} from '../utility/StyleSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {daleteLabel, updateLabel} from '../services/LabelServices';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLOR, MARGIN, PADDING, SIZES} from '../utility/Theme';
import {widthPercentageToDP} from '../utility/DynamicDimension';

const Label = props => {
  const [label, setlabel] = useState(props.Label);
  const [edit, setEdit] = useState(true);
  const handlePress = () => {
    setEdit(true);
    const labelData = label;
    console.log(labelData);
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
        {props.toggle ? (
          <TextInput
            style={{
              width: widthPercentageToDP('70%'),
              padding: PADDING.SECONADARY_PADDING,
              fontSize: SIZES.MEDIUM_TEXT,
              marginLeft: MARGIN.PRIMARY_MARGIN,
            }}
            onChangeText={text => {
              setlabel(text);
            }}
            value={label}
            onFocus={() => {
              props.toggle && setEdit(!edit);
            }}
          />
        ) : (
          <Text style={styles.editText}>{props.Label}</Text>
        )}
        {props.toggle ? (
          <View>
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
              <View>
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
              </View>
            )}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Label;
