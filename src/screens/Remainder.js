import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../utility/StyleSheet';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TopBar from '../utility/TopBar';
import BottomBar from '../utility/BottomBar';

const Remainder = ({navigation}) => {
  const [search, setSearch] = useState(false);

  const [value, setValue] = useState('');

  return (
    <View style={styles.background}>
      <TopBar
        menuPress={() => {
          navigation.openDrawer();
        }}
        text={<Text>Remainder</Text>}
        serachIcon={() => {
          setSearch(!search);
        }}
        onSearch={text => {
          setValue(text);
        }}
        value={value}
      />
      {/* Header-End */}
      <View
        style={{
          flex: 3,
        }}>
        <View style={styles.blank}>
          <FontAwesome name={'bell-o'} size={70} color={'white'} />
          <Text style={styles.blankText}>
            Notes with upcoming remainders appear here
          </Text>
        </View>
      </View>

      <BottomBar
        onPress={() => {
          navigation.navigate('Notes');
        }}
      />
    </View>
  );
};

export default Remainder;
