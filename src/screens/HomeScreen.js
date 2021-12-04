import React, {useContext} from 'react';
import {View, Text, Pressable} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';

const HomeScreen = ({navigation}) => {
  const {user, signout} = useContext(AuthContext);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}>
      <Text>welcome Home {user.uid}</Text>
      <Pressable
        onPress={() => {
          signout();
          navigation.navigate({name: 'Welcome'});
        }}>
        <Text style={{backgroundColor: 'red', width: '20%'}}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
