import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import CreateNotes from '../screens/CreateNotes';

const HomeScreen = ({navigation}) => {
  const {signout} = useContext(AuthContext);
  const [search, setSearch] = useState();
  const [active, setActive] = useState(true);
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          justifyContent: 'space-evenly',
          backgroundColor: 'mintcream',
          height: '8%',
          width: '100%',
          borderRadius: 40,
          flexDirection: 'row',
          alignContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'flex-start'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Ionicon name={'menu'} size={28} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '50%',
          }}>
          <TouchableOpacity>
            <TextInput
              placeholder={'Search your notes'}
              onChangeText={text => {
                setSearch(text);
              }}
              value={search}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Pressable onPress={() => setActive(false)}>
            <FontAwesome name={'tasks'} size={30} />
          </Pressable>
        </View>
        <View style={{right: '3%'}}>
          <FontAwesome name={'user-circle'} size={30} />
        </View>
      </View>
      <View
        style={{
          flexDirection: {active} ? 'row' : 'column',
          height: '75%',
        }}></View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(CreateNotes);
        }}>
        <View
          style={{
            left: '75%',
            shadowColor: 'white',
            shadowRadius: 50,
            backgroundColor: 'gainsboro',
            height: 69,
            width: 70,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            borderColor: 'gray',
            bottom: 3,
          }}>
          <FontAwesome5 name={'plus'} size={50} color={'darkslategrey'} />
        </View>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'flex-start',
          backgroundColor: 'darkslategrey',
          height: '8%',
          width: '100%',
          alignContent: 'space-between',
          flexDirection: 'row',
          padding: 15,
        }}>
        <View
          style={{
            justifyContent: 'space-evenly',
            alignContent: 'center',
            left: '7%',
          }}>
          <Ionicon name={'checkbox-outline'} color={'white'} size={22} />
        </View>
        <View style={styles.icon}>
          <Ionicon name={'brush'} color={'white'} size={22} />
        </View>
        <View style={styles.icon}>
          <Ionicon name={'mic-outline'} color={'white'} size={22} />
        </View>
        <View style={styles.icon}>
          <Ionicon name={'image'} color={'white'} size={22} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    justifyContent: 'space-evenly',
    alignContent: 'center',
    paddingLeft: 20,
  },
});
export default HomeScreen;
