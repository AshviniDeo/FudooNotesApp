import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, StyleSheet, FlatList} from 'react-native';
import {TextInput} from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {createLabel, fetchLabels} from '../services/LabelServices';
import Label from './Label';
import {
  BORDER,
  COLOR,
  HEIGHT,
  MARGIN,
  PADDING,
  SIZES,
  WIDTH,
} from '../utility/Theme';

const InsertLabel = ({navigation}) => {
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState('');
  const [labelData, setLabelData] = useState([]);

  const handlePress = () => {
    createLabel(label).then(() => {
      fetchData();
    });
    setLabel('');
    setActive(!active);
  };
  const fetchData = async () => {
    let data = await fetchLabels();
    setLabelData(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.background}>
      <View style={styles.labelBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Notes');
          }}>
          <Ionicon
            name={'arrow-back'}
            size={SIZES.ICON_MEDIUM}
            color={COLOR.TEXT_COLOR}
          />
        </TouchableOpacity>
        <TextInput label={'Enter label name'} />
      </View>
      <View style={{flex: 0.9}}>
        <View style={styles.window}>
          <FlatList
            data={labelData}
            renderItem={({item}) =>
              labelData.length !== 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Create new label', {
                      editData: item,
                      editId: item.labelId,
                    });
                  }}>
                  <View style={styles.editLabel}>
                    <Label
                      {...item}
                      fetchData={fetchData}
                      toggle={true}
                      addLabel={true}
                    />
                  </View>
                </TouchableOpacity>
              ) : null
            }
            keyExtractor={item => item.labelId}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  arrow: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  inputbox: {
    width: WIDTH.SECONDARY_WIDTH,
  },
  background: {
    flex: SIZES.FLEX,
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  labelBar: {
    borderWidth: BORDER.LIGHT_BORDER,
    height: HEIGHT.BAR_HEIGHT,
    alignContent: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
});
export default InsertLabel;
