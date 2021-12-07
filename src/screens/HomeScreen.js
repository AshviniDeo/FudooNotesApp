import React, {useContext} from 'react';
import {View, Text, Pressable} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import Ionicon from 'react-native-vector-icons/Ionicons';
const HomeScreen = ({navigation}) => {
  const {signout} = useContext(AuthContext);
  return (
    <View>
      <Text>hello</Text>
    </View>
  );
};

export default HomeScreen;
