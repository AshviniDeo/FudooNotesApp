import {Dimensions} from 'react-native';
import {heightPercentageToDP, widthPercentageToDP} from './DynamicDimension';
const fontscale = Dimensions.get('window').fontScale;

export const COLOR = {
  TEXT_COLOR: 'rgba(0,0,0,0.8)',
  HEADING: 'black',
  PRIMARY: '#FFF',
  SECONDARY: 'lavender',
  EMPTY_FIELD_ICON: 'gold',
  AUTH_COLOR: '#cd853f',
  ACTIVE_COLOR: 'blue',
  PLACE_HOLDER_COLOR: 'gray',
  TRANSPARENT: 'rgba(0,0,0,0)',
  ERROR_TEXT: 'red',
  NOTE_CARD: 'aliceblue',
  SHADOW: 'skyblue',
};

export const SIZES = {
  FLEX: 1,
  ICON_SMALL: 22 / fontscale,
  ICON_MEDIUM: 25 / fontscale,
  ICON_LARGE: 40 / fontscale,
  TOPBAR_ICON: 30 / fontscale,
  EMPTY_ICON: 100 / fontscale,
  SMALL_TEXT: 14 / fontscale,
  MEDIUM_TEXT: 18 / fontscale,
  LARGE_TEXT: 22 / fontscale,
  TITLE: 20 / fontscale,
  NOTE: 16 / fontscale,
  AVTAR: 120 / fontscale,
};

export const PADDING = {
  PRIMARY_PADDING: widthPercentageToDP('4%'),
  SECONADARY_PADDING: widthPercentageToDP('1.21%'),
  NEGATIVE_PADDING: widthPercentageToDP('-4%'),
  BUTTON_PADDING: widthPercentageToDP('13%'),
  BOTTOM_PADDING: 0,
  RAW_SHEET_PADDING: widthPercentageToDP('2.4%'),
  CROSS: widthPercentageToDP('30%'),
};

export const MARGIN = {
  PRIMARY_MARGIN: widthPercentageToDP('2%'),
  SECONDARY_MARGIN: widthPercentageToDP('7%'),
  BUTTON_MARGIN: widthPercentageToDP('27%'),
  BOTTOM_MARGIN: widthPercentageToDP('5%'),
};

export const BORDER = {
  THICK_BORDER: widthPercentageToDP('2%'),
  LIGHT_BORDER: widthPercentageToDP('0.20%'),
  MEDIUM_BORDER: 1,
  BORDER_RADIUS: widthPercentageToDP('12%'),
  ROUND_CORNER: widthPercentageToDP('15%'),
  CORNER: widthPercentageToDP('2.4%'),
};

export const WIDTH = {
  FULL_WIDTH: widthPercentageToDP('100%'),
  HALF_WIDTH: widthPercentageToDP('50%'),
  SECONDARY_WIDTH: widthPercentageToDP('80%'),
  BUTTON_WIDTH: widthPercentageToDP('24%'),
  LOGO_WIDTH: widthPercentageToDP('20%'),
  DATE: widthPercentageToDP('70%'),
};

export const HEIGHT = {
  WINDOW_HEIGHT: heightPercentageToDP('100%'),
  SECTION_HEIGHT: heightPercentageToDP('10%'),
  BAR_HEIGHT: heightPercentageToDP('5%'),
  LOGO_HEIGHT: heightPercentageToDP('20%'),
  BUTTON_HEIGHT: heightPercentageToDP('12%'),
  SIGNBTN: heightPercentageToDP('7%'),
  FBSHEET: heightPercentageToDP('33%'),
};
