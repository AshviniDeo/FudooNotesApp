import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {styles} from '../utility/StyleSheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {createLabel, fetchLabels} from '../services/LabelServices';
import Label from '../component/Label';
import {COLOR, PADDING, SIZES} from '../utility/Theme';
import {useSelector, useDispatch} from 'react-redux';
// import {setLabel} from '../redux/Actions';

const CreateNewLabel = ({navigation, route}) => {
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState('');
  const [labelData, setLabelData] = useState([]);

  // const data = useSelector(state => state.userReaducer);
  // console.log(data);

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
    <SafeAreaView style={styles.background}>
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
          <Text style={styles.labelText}>Edit Labels</Text>
        </View>
      </View>

      <View style={styles.labelBar}>
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
              <Text style={styles.labelText}>Create new label</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.editLabel}>
            <View style={styles.icon}>
              <TouchableOpacity
                style={styles.label}
                onPress={() => {
                  navigation.navigate('Dashboard');
                  setActive(!active);
                }}>
                <Entypo name={'cross'} size={25} color={COLOR} />
              </TouchableOpacity>
            </View>
            <View style={styles.icon}>
              <TextInput
                style={styles.labelBox}
                editable={true}
                placeholder="Create new label"
                placeholderTextColor={'gray'}
                onChangeText={text => {
                  setLabel(text);
                }}
                multiline={false}
                value={label}
              />
            </View>
            <View style={styles.icon}>
              <TouchableOpacity
                style={[styles.label, {paddingLeft: PADDING.BUTTON_PADDING}]}
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
      {labelData.length === 0 ? null : (
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
                    <Label {...item} fetchData={fetchData} toggle={true} />
                  </View>
                </TouchableOpacity>
              ) : null
            }
            keyExtractor={item => item.labelId}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CreateNewLabel;
