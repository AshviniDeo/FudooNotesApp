import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import {styles} from './StyleSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {daleteLabel, updateLabel} from '../navigation/LabelServices';
import Ionicons from 'react-native-vector-icons/Ionicons';

const COLOR = 'rgba(0,0,0,0.8)';
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
      <View style={styles.label}>
        {edit ? (
          <MaterialCommunityIcons
            name="label-outline"
            size={22}
            color={COLOR}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              onDeleteButton();
            }}>
            <Ionicons name="trash-outline" size={22} color={'black'} />
          </TouchableOpacity>
        )}
        <TextInput
          style={[styles.label, styles.lableInput]}
          onChangeText={text => {
            setlabel(text);
          }}
          value={label}
          onFocus={() => {
            setEdit(false);
          }}
        />

        {!edit && (
          <TouchableOpacity
            onPress={() => {
              handlePress();
            }}>
            <Ionicons name="checkmark" size={22} color={'blue'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Label;
