import {Dimensions} from 'react-native';
const width = Dimensions.get('window').width;

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
  ICON_SMALL: 22,
  ICON_MEDIUM: 25,
  ICON_LARGE: 40,
  TOPBAR_ICON: 30,
  EMPTY_ICON: 100,
  SMALL_TEXT: 14,
  MEDIUM_TEXT: 18,
  LARGE_TEXT: 22,
  TITLE: 20,
  NOTE: 16,
  AVTAR: 120,
};

export const PADDING = {
  PRIMARY_PADDING: 20,
  SECONADARY_PADDING: 5,
  NEGATIVE_PADDING: -15,
  BUTTON_PADDING: 50,
  BOTTOM_PADDING: 0,
  RAW_SHEET_PADDING: 10,
  CROSS: '30%',
};

export const MARGIN = {
  PRIMARY_MARGIN: 8,
  SECONDARY_MARGIN: 30,
  BUTTON_MARGIN: width >= 411 ? 110 : 70,
  BOTTOM_MARGIN: '5%',
};

export const BORDER = {
  THICK_BORDER: 8,
  LIGHT_BORDER: 0.8,
  MEDIUM_BORDER: 1,
  BORDER_RADIUS: 50,
  ROUND_CORNER: 20,
  CORNER: 10,
};

export const WIDTH = {
  FULL_WIDTH: '100%',
  HALF_WIDTH: '50%',
  SECONDARY_WIDTH: '80%',
  BUTTON_WIDTH: 100,
  LOGO_WIDTH: '20%',
  DATE: '70%',
};

export const HEIGHT = {
  WINDOW_HEIGHT: '100%',
  SECTION_HEIGHT: '10%',
  BAR_HEIGHT: '7%',
  LOGO_HEIGHT: '20%',
  BUTTON_HEIGHT: 100,
  SIGNBTN: 50,
  FBSHEET: 240,
};
