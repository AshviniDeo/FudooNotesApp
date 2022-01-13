import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {styles} from '../utility/StyleSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SIZES, COLOR, WIDTH} from '../utility/Theme';
import {Checkbox} from 'react-native-paper';

const AddLabel = props => {
  const label = props.Label;
  const labelId = props.Label.labelId;
  const [checked, setChecked] = useState(false);
  const [checkedArr, setCheckedArr] = useState([]);

  // {
  //   const index = checkedArr.findIndex(item => item === id);
  //   if (index === -1) {
  //     setCheckedArr([...checkedArr, id]);
  //   } else {
  //     let tempArr = [...checkedArr];
  //     tempArr.splice(index, 1);
  //     setCheckedArr(tempArr);
  //   }
  // }
  console.log(checkedArr);
  console.log('Label Array', checkedArr);
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
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
            if (checked) {
              setCheckedArr(...checkedArr, labelId);
            } else {
              const temp = [...checkedArr].filter(item =>
                item.labelId.includes(labelId),
              );
              setCheckedArr(temp);
            }
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
