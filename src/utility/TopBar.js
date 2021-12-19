import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput, Text} from 'react-native';
import {styles} from './StyleSheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TopBar = ({menuPress, value, onSearch, text, onPress}) => {
  const [icon, setIcon] = useState(true);
  const [searchIcon, setSearchIcon] = useState(false);

  return (
    <View style={styles.topBar}>
      <View>
        <TouchableOpacity onPress={menuPress}>
          <Ionicon name={'menu'} size={28} color={'white'} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>{text}</Text>
      </View>
      <View style={{left: 20}}>
        <TouchableOpacity
          onPress={() => {
            setSearchIcon(!searchIcon);
          }}>
          {searchIcon ? (
            <TextInput
              style={{color: 'white', left: -20}}
              placeholder={'Search your notes'}
              placeholderTextColor={'white'}
              onChangeText={onSearch}
              value={value}
            />
          ) : (
            <Ionicon name="search" size={22} color="white" />
          )}
        </TouchableOpacity>
      </View>
      <View style={{left: 10}}>
        <TouchableOpacity
          onPress={() => {
            setIcon(onPress);
          }}>
          {icon ? (
            <FontAwesome name={'tasks'} size={30} color={'white'} />
          ) : (
            <Ionicon name={'grid'} size={30} color={'white'} />
          )}
        </TouchableOpacity>
      </View>
      <View>
        <FontAwesome name={'user-circle'} size={30} color={'white'} />
      </View>
    </View>
  );
};

export default TopBar;
