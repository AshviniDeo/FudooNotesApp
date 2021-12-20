import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput, Text} from 'react-native';
import {styles} from './StyleSheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TopBar = ({
  menuPress,
  value,
  onSearch,
  text,
  onPress,
  icon,
  searchIcon,
}) => {
  const COLOR = 'rgba(0,0,0,0.9)';
  const [, setSearchIcon] = useState(false);
  return (
    <View style={styles.topBar}>
      <View>
        <TouchableOpacity onPress={menuPress}>
          <Ionicon name={'menu'} size={28} color={COLOR} />
        </TouchableOpacity>
      </View>
      {searchIcon === false && (
        <View>
          <Text style={styles.title}>{text}</Text>
        </View>
      )}
      <View style={{left: 10}}>
        {searchIcon && (
          <TextInput
            style={{color: COLOR, paddingLeft: -20, fontSize: 18}}
            placeholder={'Search your notes'}
            placeholderTextColor={'gray'}
            onChangeText={onSearch}
            value={value}
          />
        )}
        {searchIcon === false && (
          <TouchableOpacity
            onPress={() => {
              setSearchIcon(!searchIcon);
            }}>
            <Ionicon name="search" size={22} color={COLOR} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{left: 10}}>
        <TouchableOpacity onPress={onPress}>
          {icon ? (
            <FontAwesome name={'tasks'} size={30} color={COLOR} />
          ) : (
            <Ionicon name={'grid'} size={30} color={COLOR} />
          )}
        </TouchableOpacity>
      </View>
      <View>
        <FontAwesome name={'user-circle'} size={30} color={COLOR} />
      </View>
    </View>
  );
};

export default TopBar;
