import React, {useContext, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../navigation/AuthProvider';
import {fetchLabels} from '../navigation/LabelServices';
import Label from './Label';
import TEXT_COLOR from './ThemeColor';

const CustomeDrawer = ({navigation, props}) => {
  const {signout} = useContext(AuthContext);
  const [labelData, setLabelData] = useState([]);
  const [active, setActive] = useState(false);
  const fetchData = async () => {
    let data = await fetchLabels();
    setLabelData(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{}}
      nestedScrollEnabled={true}>
      <View style={{flex: 1, paddingTop: 10}}>
        <View style={[styles.view, styles.heading]}>
          <Text style={styles.heading}>FundooNotes</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Dashboard');
              setActive(!active);
            }}>
            <View style={styles.view}>
              <Ionicon name="bulb-outline" size={22} color={TEXT_COLOR} />
              <Text style={styles.text}>Notes</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Remainder');
              setActive(!active);
            }}>
            <View style={styles.view}>
              <FontAwesome name="bell-o" size={22} color={TEXT_COLOR} />
              <Text style={styles.text}>Remainder</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Create new label');
              setActive(!active);
            }}>
            <View style={[styles.view, {paddingTop: 20}]}>
              <AntDesign name="plus" size={22} color={TEXT_COLOR} />
              <Text style={styles.text}>Create new label</Text>
            </View>
          </TouchableOpacity>
        </View>
        {labelData.length === 0 ? null : (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Create new label');
                setActive(!active);
              }}>
              <View style={styles.editBar}>
                <View
                  style={
                    ([styles.view],
                    {
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    })
                  }>
                  <Text
                    style={{
                      color: TEXT_COLOR,
                      fontSize: 14,
                    }}>
                    Labels
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Create new label');
                    }}>
                    <Text style={styles.editText}>Edits</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  {labelData.map((item, index) => (
                    <TouchableOpacity
                      key={item.labelId}
                      onPress={() => {
                        navigation.navigate('Create new label', {
                          editData: item,
                          editId: item.labelId,
                        });
                      }}>
                      <Label {...item} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.line}></View>

        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ArchiveScreen');
              setActive(!active);
            }}>
            <View style={[styles.view, {paddingTop: 20}]}>
              <Ionicon name="archive-outline" size={22} color={TEXT_COLOR} />
              <Text style={styles.text}>Archive</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Trash');
              setActive(!active);
            }}>
            <View style={styles.view}>
              <Ionicon name="trash-outline" size={22} color={TEXT_COLOR} />
              <Text style={styles.text}>Trash</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Settings');
              setActive(!active);
            }}>
            <View style={styles.view}>
              <Ionicon name="settings-outline" size={22} color={TEXT_COLOR} />
              <Text style={styles.text}>Settings</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              signout();
            }}>
            <View style={[styles.view, {justifyContent: 'center'}]}>
              <MaterialCommunityIcons
                name="logout"
                size={22}
                color={TEXT_COLOR}
              />
              <Text style={styles.text}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
  editBar: {
    flexDirection: 'column',
    top: 10,
    left: 10,
    paddingBottom: 10,
  },
  editText: {color: TEXT_COLOR, fontSize: 14, marginRight: 30},
  text: {
    fontSize: 18,
    color: TEXT_COLOR,
    paddingLeft: 10,
  },
  view: {
    paddingTop: 20,
    flexDirection: 'row',
    paddingLeft: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  line: {borderTopColor: 'lavender', borderTopWidth: 0.8, top: 10},
});
export default CustomeDrawer;
