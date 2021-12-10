import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Notes from './Notes';

const Remainder = ({navigation}) => {
  const {signout} = useContext(AuthContext);
  const [search, setSearch] = useState();
  const [active, setActive] = useState(false);
  const handlePress = () => {
    setActive(!active);
  };
  const toNavigate = () => {
    navigation.navigate(Notes);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black', opacity: 0.9}}>
      <View
        style={{
          justifyContent: 'space-evenly',
          backgroundColor: 'dimgrey',
          height: '8%',
          width: '100%',
          borderRadius: 20,
          flexDirection: 'row',
          alignContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'flex-start'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Ionicon name={'menu'} size={28} color={'white'} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Remainder
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: '50%',
          }}>
          <TouchableOpacity
            onPress={() => {
              setActive(!active);
            }}>
            {active ? (
              <TextInput
                placeholder={'Search your notes'}
                placeholderTextColor={'white'}
                onChangeText={text => {
                  setSearch(text);
                }}
                value={search}
              />
            ) : (
              <Ionicon name="search" size={22} color="white" />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Pressable
            onPress={() => {
              handlePress();
            }}>
            {active ? (
              <FontAwesome name={'tasks'} size={30} color={'white'} />
            ) : (
              <Ionicon name={'grid'} size={30} color={'white'} />
            )}
          </Pressable>
        </View>
      </View>
      {/* Header-End */}
      <View
        style={{
          flexDirection: {active} ? 'row' : 'column',
          height: '75%',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            left: '5%',
          }}>
          <FontAwesome name={'bell-o'} size={70} color={'white'} />
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              alignItems: 'center',
              top: 15,
            }}>
            Notes with upcoming remainders appear here
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          toNavigate();
        }}>
        <View
          style={{
            left: '75%',
            shadowColor: 'white',
            shadowRadius: 50,
            backgroundColor: 'dimgray',
            height: 70,
            width: 70,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            borderColor: 'black',
            borderEndWidth: 6,
            borderBottomWidth: 6,
            opacity: 0.9,
          }}>
          <AntDesign name={'plus'} size={35} color={'white'} />
        </View>
        {/* Bottom-Bar Start */}
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'flex-start',
          backgroundColor: 'dimgray',
          height: '8%',
          width: '100%',
          alignContent: 'space-between',
          flexDirection: 'row',
          padding: 15,
          borderRadius: 20,
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
export default Remainder;