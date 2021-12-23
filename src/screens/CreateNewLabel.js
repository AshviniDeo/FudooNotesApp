import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, FlatList} from 'react-native';
import {styles} from '../utility/StyleSheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {createLabel, fetchLabels} from '../navigation/LabelServices';
import Label from '../utility/Label';

const CreateNewLabel = ({navigation, route}) => {
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState('');
  const [edit, setEdit] = useState(true);
  const [labelData, setLabelData] = useState([]);
  const COLOR = 'rgba(0,0,0,0.8)';
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
    setEdit(true);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.background}>
      <View style={[styles.labelBar, {justifyContent: 'flex-start'}]}>
        <View style={{left: 10, top: 10}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Dashboard');
            }}>
            <Ionicon name={'arrow-back'} size={28} color={COLOR} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            left: 15,
            top: 10,
            bottom: 5,
          }}>
          <Text style={styles.labelText}>Edit Labels</Text>
        </View>
      </View>

      <View style={[styles.labelBar, {justifyContent: 'flex-start'}]}>
        {!active ? (
          <View>
            <TouchableOpacity
              style={styles.label}
              onPress={() => {
                setActive(!active);
              }}>
              <AntDesign name={'plus'} size={22} color={COLOR} />
              <Text style={styles.labelText}>Create new label</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              top: 5,
            }}>
            <TouchableOpacity
              style={styles.label}
              onPress={() => {
                navigation.navigate('Dashboard');
                setActive(!active);
              }}>
              <Entypo name={'cross'} size={25} color={COLOR} />
            </TouchableOpacity>
            <TextInput
              style={styles.labelBox}
              editable={true}
              placeholder="Create new label"
              placeholderTextColor={'gray'}
              onChangeText={text => {
                setLabel(text);
              }}
              value={label}
            />
            <TouchableOpacity
              style={[styles.label, {left: 20}]}
              onPress={() => {
                handlePress();
              }}>
              <Ionicon name={'checkmark'} size={25} color={COLOR} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {labelData.length === 0 ? null : (
        <View style={{paddingTop: 10}}>
          <FlatList
            data={labelData}
            renderItem={({item}) =>
              labelData.length !== 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    setEdit(false);
                    navigation.navigate('Create new label', {
                      editData: item,
                      editId: item.labelId,
                    });
                  }}>
                  <View style={styles.editLabel}>
                    <Label {...item} fetchData={fetchData} />

                    {edit && (
                      <Ionicon name="md-pencil-sharp" size={22} color={COLOR} />
                    )}
                  </View>
                </TouchableOpacity>
              ) : null
            }
            keyExtractor={item => item.labelId}
          />
        </View>
      )}
    </View>
  );
};

export default CreateNewLabel;
