import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {styles} from '../utility/StyleSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SIZES, COLOR, WIDTH} from '../utility/Theme';
import {Checkbox} from 'react-native-paper';

const AddLabel = props => {
  const label = props.Label;
  const labelId = props.labelId;

  return (
    <View>
      <View style={custome.editLabel}>
        <View style={styles.labelView}>
          <MaterialCommunityIcons
            name="label-outline"
            size={SIZES.ICON_MEDIUM}
            color={COLOR.TEXT_COLOR}
          />

          <Text style={styles.icon}>{label}</Text>
        </View>
        <Checkbox
          key={labelId}
          status={props.checked ? 'checked' : 'unchecked'}
          onPress={() => {
            props.handleCheck({labelId, label});
          }}
        />
      </View>
    </View>
  );
};
const custome = StyleSheet.create({
  editLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WIDTH.SECONDARY_WIDTH,
  },
});
export default AddLabel;
