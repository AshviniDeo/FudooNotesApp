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
import useLocalisation from '../localisation/useLocalisation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const InsertLabel = ({navigation, route}) => {
  const [label, setLabel] = useState('');
  const [labelData, setLabelData] = useState([]);
  const [toggle, setToggle] = useState(true);

  const dictonary = useLocalisation('EN');
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  const handleToggle = id => {
    let temp = [...labelData];
    temp.forEach(item => {
      if (item.labelId === id) {
        setToggle(!toggle);
      }
    });
    setLabelData(temp);
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.labelBar}>
        <View style={styles.arrow}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notes', {Labels: labelData});
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
            placeholder={dictonary.ENTER_LABEL_NAME_TEXT}
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
            <View style={styles.editLabel}>
              <TouchableOpacity key={item.labelId}>
                <AddLabel {...item} />
              </TouchableOpacity>
              {toggle ? (
                <TouchableOpacity
                  onPress={() => {
                    handleToggle(item.labelId);
                  }}>
                  <MaterialCommunityIcons
                    name="checkbox-blank-outline"
                    size={SIZES.ICON_MEDIUM}
                    color={COLOR.TEXT_COLOR}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    handleToggle(item.labelId);
                  }}>
                  <Ionicons
                    name="checkbox"
                    size={SIZES.ICON_MEDIUM}
                    color={COLOR.ACTIVE_COLOR}
                  />
                </TouchableOpacity>
              )}
            </View>
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
            <Text style={styles.labelText}>
              {dictonary.CREATE_TEXT} "{label}"
            </Text>
          </View>
          <View>
            {labelData.map(
              (item, index) =>
                item.Label === label && (
                  <View style={styles.editLabel}>
                    <TouchableOpacity key={item.labelId}>
                      <AddLabel {...item} />
                    </TouchableOpacity>
                    {toggle ? (
                      <TouchableOpacity
                        onPress={() => {
                          handleToggle(item.labelId);
                        }}>
                        <MaterialCommunityIcons
                          name="checkbox-blank-outline"
                          size={SIZES.ICON_MEDIUM}
                          color={COLOR.TEXT_COLOR}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          handleToggle(item.labelId);
                        }}>
                        <Ionicons
                          name="checkbox"
                          size={SIZES.ICON_MEDIUM}
                          color={COLOR.ACTIVE_COLOR}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
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
  editLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WIDTH.SECONDARY_WIDTH,
  },
});
export default InsertLabel;
