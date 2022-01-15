import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {styles} from '../utility/StyleSheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {createLabel, fetchLabels} from '../services/LabelServices';
import Label from '../component/Label';
import {COLOR, SIZES} from '../utility/Theme';
import {LogBox} from 'react-native';
import useLocalisation from '../localisation/useLocalisation';
// import {setLabelData} from '../redux/Actions';

LogBox.ignoreAllLogs(true);
const CreateNewLabel = ({navigation, route}) => {
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState('');
  const [labelData, setLabelData] = useState([]);

  const dictonary = useLocalisation('EN');

  // const labelData = useSelector(state => state.SET_LABEL_DATA);
  // const dispatch = useDispatch();

  const handlePress = () => {
    createLabel(label)
      .then(() => {
        fetchData();
      })
      .catch(error => {
        return error;
      });
    setLabel('');
    setActive(!active);
  };

  const fetchData = useCallback(async () => {
    let data = await fetchLabels();
    setLabelData(data);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    });

    return unsubscribe;
  }, [navigation, fetchData]);

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
        <View style={styles.labelBar}>
          <View style={styles.icon}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Dashboard');
              }}>
              <Ionicon
                name={'arrow-back'}
                size={SIZES.ICON_MEDIUM}
                color={COLOR.TEXT_COLOR}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.icon}>
            <Text style={styles.labelText}>{dictonary.EDIT_LABELS_TEXT}</Text>
          </View>
        </View>
        <View style={styles.window}>
          <View style={[styles.labelBar]}>
            {!active ? (
              <View style={styles.icon}>
                <TouchableOpacity
                  style={styles.label}
                  onPress={() => {
                    setActive(!active);
                  }}>
                  <AntDesign
                    name={'plus'}
                    size={SIZES.ICON_MEDIUM}
                    color={COLOR.TEXT_COLOR}
                  />
                  <Text style={styles.labelText}>
                    {dictonary.CREATE_NEW_LABEL_TEXT}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.editLabel}>
                <View style={styles.icon}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Dashboard');
                      setActive(!active);
                    }}>
                    <Entypo
                      name={'cross'}
                      size={SIZES.ICON_MEDIUM}
                      color={COLOR}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.icon}>
                  <TextInput
                    style={styles.labelBox}
                    editable={true}
                    placeholder={dictonary.CREATE_NEW_LABEL_TEXT}
                    placeholderTextColor={COLOR.PLACE_HOLDER_COLOR}
                    onChangeText={text => {
                      setLabel(text);
                    }}
                    multiline={false}
                    value={label}
                  />
                </View>
                <View style={styles.icon}>
                  <TouchableOpacity
                    onPress={() => {
                      handlePress();
                    }}>
                    <Ionicon
                      name={'checkmark'}
                      size={SIZES.ICON_MEDIUM}
                      color={COLOR.ACTIVE_COLOR}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          {labelData && (
            <ScrollView>
              <FlatList
                scrollEnabled={false}
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
                        <Label {...item} fetchData={fetchData} toggle={true} />
                      </View>
                    </TouchableOpacity>
                  ) : null
                }
                keyExtractor={item => item.labelId}
              />
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateNewLabel;
