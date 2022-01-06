import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../utility/StyleSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SIZES, COLOR} from '../utility/Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddLabel = props => {
  const [label, setlabel] = useState(props.Label);

  return (
    <View>
      <View style={styles.labelView}>
        <MaterialCommunityIcons
          name="label-outline"
          size={SIZES.ICON_MEDIUM}
          color={COLOR.TEXT_COLOR}
        />

        <TextInput
          style={[styles.label, styles.lableInput]}
          onChangeText={text => {
            setlabel(text);
          }}
          value={label}
        />
        {props.toggle ? (
          <TouchableOpacity onPress={props.handleToggle}>
            <MaterialCommunityIcons
              name="checkbox-blank-outline"
              size={SIZES.ICON_MEDIUM}
              color={COLOR.TEXT_COLOR}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={props.handleToggle}>
            <Ionicons
              name="checkbox"
              size={SIZES.ICON_MEDIUM}
              color={COLOR.ACTIVE_COLOR}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AddLabel;
