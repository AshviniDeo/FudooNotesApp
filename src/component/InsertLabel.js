import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createLabel, fetchLabels} from '../services/LabelServices';
import {BORDER, COLOR, HEIGHT, PADDING, SIZES, WIDTH} from '../utility/Theme';
import AddLabel from './AddLabel';
import AntDesign from 'react-native-vector-icons/AntDesign';

const InsertLabel = ({navigation}) => {
  const [active, setActive] = useState([]);
  const [label, setLabel] = useState('');
  const [labelData, setLabelData] = useState([]);

  const handlePress = () => {
    createLabel(label).then(() => {
      fetchData();
    });
    setLabel('');
  };

  const fetchData = async () => {
    let data = await fetchLabels();
    setLabelData(data);
  };
  console.log(active);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.labelBar}>
        <View style={styles.arrow}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notes');
            }}>
            <Ionicons
              name={'arrow-back'}
              size={SIZES.ICON_MEDIUM}
              color={COLOR.TEXT_COLOR}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.arrow}>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter label name"
            value={label}
            onChangeText={text => {
              setLabel(text);
            }}
            underlineColor={COLOR.TRANSPARENT}
            activeUnderlineColor={COLOR.TRANSPARENT}
            selectionColor={COLOR.ACTIVE_COLOR}
          />
        </View>
      </View>
      {label.length === 0 ? (
        <View style={styles.window}>
          {labelData.map((item, index) => (
            <TouchableOpacity key={item.labelId}>
              <View style={styles.editLabel}>
                <AddLabel {...item} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.window}>
          <View style={styles.newlabel}>
            <TouchableOpacity onPress={handlePress}>
              <AntDesign
                name={'plus'}
                size={SIZES.ICON_MEDIUM}
                color={COLOR.ACTIVE_COLOR}
              />
            </TouchableOpacity>
            <Text style={styles.labelText}>Create "{label}"</Text>
          </View>
          <View>
            {labelData.map(
              (item, index) =>
                item.Label === label && (
                  <TouchableOpacity key={item.labelId}>
                    <View style={styles.editLabel}>
                      <AddLabel {...item} />
                    </View>
                  </TouchableOpacity>
                ),
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  labelText: {
    paddingLeft: PADDING.SECONADARY_PADDING,
    fontSize: SIZES.NOTE,
  },
  newlabel: {
    borderBottomWidth: BORDER.MEDIUM_BORDER,
    borderBottomColor: COLOR.TEXT_COLOR,
    alignContent: 'center',
    paddingLeft: PADDING.PRIMARY_PADDING,
    flexDirection: 'row',
  },
  window: {flex: 0.9, paddingTop: PADDING.SECONADARY_PADDING},
  inputBox: {
    width: WIDTH.FULL_WIDTH,
    backgroundColor: COLOR.TRANSPARENT,
    paddingLeft: PADDING.PRIMARY_PADDING,
  },
  arrow: {
    alignContent: 'center',
    justifyContent: 'center',
    paddingLeft: PADDING.SECONADARY_PADDING,
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
