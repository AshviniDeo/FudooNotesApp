import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log('Height : ', windowHeight);
console.log('Width :', windowWidth);
export const COLOR = {
  TEXT_COLOR: 'rgba(0,0,0,0.8)',
  HEADING: 'black',
  PRIMARY: '#FFF',
  SECONDARY: 'lavender',
};

export const SIZES = {
  FLEX: 1,
  ICON_SMALL: 22,
  ICON_MEDIUM: 25,
  ICON_LARGE: 40,
  SMALL_TEXT: 14,
  MEDIUM_TEXT: 18,
  LARGE_TEXT: 22,
  IMAGE_RESIZE: 'contain',
};

export const PADDING = {
  PRIMARY_PADDING: 20,
  SECONADARY_PADDING: 5,
  NEGATIVE_PADDING: -15,
  BUTTON_PADDING: 50,
  BOTTOM_PADDING: 0,
};

export const MARGIN = {
  PRIMARY_MARGIN: 8,
  SECONDARY_MARGIN: 30,
};

export const BORDER = {
  THICK_BORDER: 8,
  LIGHT_BORDER: 0.8,
  MEDIUM_BORDER: 1,
  BORDER_RADIUS: 50,
  ROUND_CORNER: 20,
  BORDER_STYLE: 'solid',
};
export const WIDTH = {
  FULL_WIDTH: '100%',
  HALF_WIDTH: '50%',
  SECONDARY_WIDTH: '80%',
  BUTTON_WIDTH: '10%',
  LOGO_WIDTH: '20%',
};

export const DIRECTION = {
  FLEX_ROW: 'row',
  FLEX_COLUMN: 'column',
  FLEX_START: 'flex-start',
  FLEXT_END: 'flex-end',
  FLEX_ALIGN: 'center',
  SPACE_BETWEEN: 'space-between',
  SPACE_EVENLY: 'space-evenly',
  SPACE_AROUND: 'space-around',
};

export const FONT = {
  FONT_WEIGHT: 'bold',
};

export const HEIGHT = {
  WINDOW_HEIGHT: '100%',
  SECTION_HEIGHT: '10%',
  BAR_HEIGHT: '7%',
  LOGO_HEIGHT: '20%',
};

export const POSITION = {
  RELATIVE_POSITION: 'relative',
  ABSOLUTE_POSITION: 'absolute',
};
