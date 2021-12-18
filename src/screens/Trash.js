import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {styles} from '../utility/StyleSheet';

const Trash = ({navigation}) => {
  const [active, setActive] = useState(false);
  return (
    <View style={styles.background}>
      <View style={styles.trashBar}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Ionicon name={'menu'} size={28} color={'white'} />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              left: 25,
              fontWeight: 'bold',
            }}>
            Trash
          </Text>
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
          <FontAwesome name={'trash'} size={100} color={'white'} />
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
