import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../utility/StyleSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SIZES, COLOR} from '../utility/Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddLabel = props => {
  const [label, setlabel] = useState(props.Label);
  const [toggle, setToggle] = useState(false);

  const handlePress = () => {
    setToggle(!toggle);
  };

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
        {!toggle ? (
          <TouchableOpacity onPress={handlePress}>
            <MaterialCommunityIcons
              name="checkbox-blank-outline"
              size={SIZES.ICON_MEDIUM}
              color={COLOR.TEXT_COLOR}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handlePress}>
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
