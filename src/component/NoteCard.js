import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {BORDER, COLOR, PADDING, SIZES} from '../utility/Theme';
import {styles} from '../utility/StyleSheet';
import {View} from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NoteCard = props => {
  return (
    <View
      style={[
        custom.card,
        {backgroundColor: props.BackgroundColor || COLOR.PRIMARY},
      ]}>
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
    </View>
  );
};

const custom = StyleSheet.create({
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
