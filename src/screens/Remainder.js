import React, {useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {styles} from '../utility/StyleSheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TopBar from '../component/TopBar';
import BottomBar from '../component/BottomBar';
import {COLOR, SIZES} from '../utility/Theme';

const Reminder = ({navigation}) => {
  const [search, setSearch] = useState(false);
  const [active, setActive] = useState(true);
  const [value, setValue] = useState('');

  return (
    <SafeAreaView style={styles.background}>
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
        searchIcon={false}
        onPress={() => {
          setActive(!active);
        }}
        icon={active}
      />
      {/* Header-End */}
      <View style={styles.container}>
        <View style={styles.middle}>
          <FontAwesome
            name={'bell-o'}
            size={SIZES.EMPTY_ICON}
            color={COLOR.EMPTY_FIELD_ICON}
          />
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
    </SafeAreaView>
  );
};

export default Reminder;
