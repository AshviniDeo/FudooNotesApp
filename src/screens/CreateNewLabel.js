import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, FlatList} from 'react-native';
import {styles} from '../utility/StyleSheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {createLabel, fetchLabels} from '../navigation/LabelServices';
import Label from '../utility/Label';
const CreateNewLabel = ({navigation}) => {
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState('');
  const [labelData, setLabelData] = useState([]);
  const handlePress = () => {
    createLabel(label);
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
        <View style={{left: 10, top: 10}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Dashboard');
            }}>
            <Ionicon name={'arrow-back'} size={28} color={'white'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            left: 15,
            top: 10,
            bottom: 5,
          }}>
          <Text style={styles.title}>Edit Labels</Text>
        </View>
      </View>

      <View style={styles.labelBar}>
        {!active ? (
          <View>
            <TouchableOpacity
              style={styles.label}
              onPress={() => {
                setActive(!active);
              }}>
              <AntDesign name={'plus'} size={22} color={'white'} />
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
              <Entypo name={'cross'} size={25} color={'white'} />
            </TouchableOpacity>
            <TextInput
              style={{
                left: 15,
                fontSize: 18,
                bottom: 5,
                fontWeight: '400',
                color: 'white',
              }}
              editable={true}
              placeholder="Create new Note"
              placeholderTextColor={'white'}
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
              <Ionicon name={'checkmark'} size={25} color={'white'} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {labelData.length === 0 ? null : (
        <View>
          <Text style={styles.subtitles}>Labels:</Text>
          <FlatList
            data={labelData}
            renderItem={({item}) =>
              labelData.length !== 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Create new label', {
                      editData: item,
                      editId: item.id,
                    });
                  }}>
                  <Label {...item} />
                </TouchableOpacity>
              ) : null
            }
          />
        </View>
      )}
    </View>
  );
};

export default CreateNewLabel;
