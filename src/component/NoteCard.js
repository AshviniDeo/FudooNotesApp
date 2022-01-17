import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {BORDER, COLOR, PADDING, SIZES, MARGIN} from '../utility/Theme';
import {styles} from '../utility/StyleSheet';
import {View} from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar, Chip} from 'react-native-paper';
import {widthPercentageToDP} from '../utility/DynamicDimension';
import {moment} from 'moment';

const NoteCard = props => {
  return (
    <View
      style={[
        custom.card,
        {backgroundColor: props.BackgroundColor || COLOR.PRIMARY},
      ]}>
      {props.isImageNote && (
        <Avatar.Image
          size={widthPercentageToDP('20%')}
          source={{uri: props.image || ''}}
        />
      )}
      <Text style={custom.title}>{props.Title || ''}</Text>
      {!props.Note !== '' && (
        <View>
          <Text style={custom.note}>{props.Note || ''}</Text>
        </View>
      )}
      {props.List && (
        <View>
          {Object.values(props.List).map((item, index) => (
            <View key={index} style={styles.label}>
              <MaterialCommunityIcons
                name="checkbox-blank-outline"
                size={SIZES.MEDIUM_TEXT}
                color={COLOR.HEADING}
              />
              <Text
                style={[
                  custom.note,
                  {
                    paddingTop: PADDING.NEGATIVE_PADDING,
                    paddingLeft: PADDING.SECONADARY_PADDING,
                  },
                ]}>
                {item.name || ''}
              </Text>
            </View>
          ))}
        </View>
      )}
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {props.labelData &&
          props.labelData.map(item => (
            <View>
              <Chip style={custom.chip} icon={'label'}>
                {item.label}
              </Chip>
            </View>
          ))}
        {/* <View>
          {props.Reminder ? (
            <Chip
              style={[custom.chip, {width: widthPercentageToDP('50%')}]}
              icon={'alarm'}>
              <Text>
                {' '}
                {moment(props.Reminder)
                  .format('MMM DD hh:mm a')
                  .toIOSString?.() || ''}
              </Text>
            </Chip>
          ) : null}
        </View> */}
      </View>
    </View>
  );
};

const custom = StyleSheet.create({
  chip: {
    padding: PADDING.SECONADARY_PADDING,
    margin: MARGIN.PRIMARY_MARGIN,
    alignContent: 'center',
    justifyContent: 'center',
    color: COLOR.HEADING,
    fontSize: SIZES.SMALL_TEXT,
    width: widthPercentageToDP('30%'),
  },
  card: {
    padding: PADDING.PRIMARY_PADDING,
    borderWidth: BORDER.LIGHT_BORDER,
    borderColor: COLOR.PLACE_HOLDER_COLOR,
    borderRadius: BORDER.CORNER,
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  title: {
    fontSize: SIZES.TITLE,
    color: COLOR.HEADING,
    fontWeight: 'bold',
  },
  note: {
    fontSize: SIZES.MEDIUM_TEXT,
    color: COLOR.PLACE_HOLDER_COLOR,
  },
});
export default NoteCard;
