import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Trash = ({navigation}) => {
  const [active, setActive] = useState(false);
  return (
    <View style={{flex: 1, backgroundColor: 'black', opacity: 0.9}}>
      <View
        style={{
          justifyContent: 'flex-start',
          backgroundColor: 'dimgrey',
          height: '8%',
          width: '100%',
          borderRadius: 20,
          flexDirection: 'row',
          alignContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'flex-start', left: 15}}>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Ionicon name={'menu'} size={28} color={'white'} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{color: 'white', fontSize: 20, left: 25}}>Trash</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: {active} ? 'row' : 'column',
          height: '85%',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            left: '15%',
          }}>
          <FontAwesome name={'trash'} size={100} color={'yellow'} />
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              alignItems: 'center',
              top: 15,
            }}>
            No notes in Trash
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Trash;
