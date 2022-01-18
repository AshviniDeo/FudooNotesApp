import React, {useContext, useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../navigation/AuthProvider';
import {fetchLabels} from '../services/LabelServices';
import Label from '../component/Label';
import {useSelector, useDispatch} from 'react-redux';
import {setLabelData} from '../redux/Actions';
import {COLOR, SIZES, PADDING, MARGIN, BORDER, WIDTH} from './Theme';

import useLocalisation from '../localisation/useLocalisation';

const CustomeDrawer = ({navigation, props}) => {
  const {signout} = useContext(AuthContext);
  // const [labelData, setLabelData] = useState([]);
  const [active, setActive] = useState(false);
  const labelData = useSelector(state => state.labelData);
  const dispatch = useDispatch();
  const fetchData = useCallback(async () => {
    let data = await fetchLabels();
    dispatch(setLabelData(data));
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation, fetchData]);
  const dictonary = useLocalisation('EN');

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{}}
      nestedScrollEnabled={true}>
      <View style={styles.container}>
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
              <Ionicon
                name="bulb-outline"
                size={SIZES.ICON_SMALL}
                color={COLOR.TEXT_COLOR}
              />
              <Text style={styles.text}>{dictonary.NOTES_TEXT}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Reminder');
              setActive(!active);
            }}>
            <View style={styles.view}>
              <FontAwesome
                name="bell-o"
                size={SIZES.ICON_SMALL}
                color={COLOR.TEXT_COLOR}
              />
              <Text style={styles.text}>{dictonary.REMINDER_TEXT}</Text>
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
            <View style={[styles.view, styles.labelView]}>
              <AntDesign
                name="plus"
                size={SIZES.ICON_SMALL}
                color={COLOR.TEXT_COLOR}
              />
              <Text style={styles.text}>{dictonary.CREATE_NEW_LABEL_TEXT}</Text>
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
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingRight: PADDING.PRIMARY_PADDING,
                  }}>
                  <Text
                    style={{
                      color: COLOR.TEXT_COLOR,
                      fontSize: SIZES.SMALL_TEXT,
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
                <View style={styles.editText}>
                  {labelData.map((item, index) => (
                    <TouchableOpacity
                      key={item.labelId}
                      onPress={() => {
                        navigation.navigate('Create new label', {
                          editData: item,
                          editId: item.labelId,
                        });
                      }}>
                      <View>
                        <Label {...item} toggle={false} />
                      </View>
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
              navigation.navigate('Archive');
              setActive(!active);
            }}>
            <View style={[styles.view, {paddingTop: PADDING.PRIMARY_PADDING}]}>
              <Ionicon
                name="archive-outline"
                size={SIZES.ICON_SMALL}
                color={COLOR.TEXT_COLOR}
              />
              <Text style={styles.text}>{dictonary.ARCHIVE_TEXT}</Text>
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
              <Ionicon
                name="trash-outline"
                size={SIZES.ICON_SMALL}
                color={COLOR.TEXT_COLOR}
              />
              <Text style={styles.text}>{dictonary.TRASH_TEXT}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Settings');
              setActive(!active);
              fetchData();
            }}>
            <View style={styles.view}>
              <Ionicon
                name="settings-outline"
                size={SIZES.ICON_SMALL}
                color={COLOR.TEXT_COLOR}
              />
              <Text style={styles.text}>{dictonary.SETTING_TEXT}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              signout();
            }}>
            <View style={[styles.view, {alignItems: 'center'}]}>
              <MaterialCommunityIcons
                name="logout"
                size={SIZES.ICON_SMALL}
                color={COLOR.TEXT_COLOR}
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
  container: {flex: SIZES.FLEX, paddingTop: PADDING.PRIMARY_PADDING},
  editBar: {
    flexDirection: 'column',
    paddingTop: PADDING.PRIMARY_PADDING,
    paddingLeft: PADDING.PRIMARY_PADDING,
  },
  editText: {
    color: COLOR.TEXT_COLOR,
    fontSize: SIZES.SMALL_TEXT,
    marginRight: MARGIN.PRIMARY_MARGIN,
    paddingLeft: PADDING.SECONADARY_PADDING,
  },
  text: {
    fontSize: SIZES.MEDIUM_TEXT,
    color: COLOR.TEXT_COLOR,
    paddingLeft: PADDING.PRIMARY_PADDING,
  },
  view: {
    paddingTop: PADDING.PRIMARY_PADDING,
    flexDirection: 'row',
    paddingLeft: PADDING.PRIMARY_PADDING,
    width: WIDTH.FULL_WIDTH,
  },
  heading: {
    fontSize: SIZES.LARGE_TEXT,
    fontWeight: 'bold',
    color: COLOR.HEADING,
  },
  line: {
    borderTopColor: COLOR.SECONDARY,
    borderTopWidth: BORDER.LIGHT_BORDER,
    marginTop: MARGIN.PRIMARY_MARGIN,
  },
  listLabel: {
    paddingLeft: PADDING.PRIMARY_PADDING,
    justifyContent: 'flex-start',
  },
});
export default CustomeDrawer;
