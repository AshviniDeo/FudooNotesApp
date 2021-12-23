import React from 'react';
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

  return (
    <View style={styles.topBar}>
      <View>
        <TouchableOpacity onPress={menuPress}>
          <Ionicon name={'menu'} size={30} color={COLOR} />
        </TouchableOpacity>
      </View>
      {!searchIcon && (
        <View>
          <Text style={styles.title}>{text}</Text>
        </View>
      )}
      <View style={{left: 10}}>
        {searchIcon ? (
          <TextInput
            style={{color: COLOR, paddingLeft: -20, fontSize: 18}}
            placeholder={'Search your notes'}
            placeholderTextColor={'gray'}
            onChangeText={onSearch}
            value={value}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              searchIcon = true;
            }}>
            <Ionicon name="search" size={25} color={COLOR} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{left: 10}}>
        <TouchableOpacity onPress={onPress}>
          {icon ? (
            <FontAwesome name={'tasks'} size={25} color={COLOR} />
          ) : (
            <Ionicon name={'grid'} size={25} color={COLOR} />
          )}
        </TouchableOpacity>
      </View>
      <View>
        <FontAwesome name={'user-circle'} size={25} color={COLOR} />
      </View>
    </View>
  );
};

export default TopBar;
