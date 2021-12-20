import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {styles} from '../utility/StyleSheet';

const Trash = ({navigation}) => {
  return (
    <View style={styles.background}>
      <View style={styles.trashBar}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Ionicon name={'menu'} size={28} color={'rgba(0,0,0,0.9)'} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.trashText}>Trash</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          flex: 3,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            left: '5%',
            top: '30%',
          }}>
          <FontAwesome name={'trash'} size={100} color={'gold'} />
          <Text
            style={{
              color: 'rgba(0,0,0,0.9)',
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
