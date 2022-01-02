import {StyleSheet} from 'react-native';
import {COLOR, PADDING, SIZES, WIDTH, MARGIN, BORDER, HEIGHT} from './Theme';

export const styles = StyleSheet.create({
  loaderStyle: {
    marginVertical: MARGIN.PRIMARY_MARGIN,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: PADDING.PRIMARY_PADDING,
  },
  searchInput: {
    color: COLOR.TRANSPARENT,
    paddingLeft: PADDING.NEGATIVE_PADDING,
    fontSize: SIZES.MEDIUM_TEXT,
  },
  buttonLogIn: {
    flexDirection: 'row',
    width: WIDTH.SECONDARY_WIDTH,
    paddingTop: PADDING.PRIMARY_PADDING,
    margin: MARGIN.SECONDARY_MARGIN,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
  },
  button: {
    color: COLOR.AUTH_COLOR,
    fontWeight: 'bold',
    fontSize: SIZES.MEDIUM_TEXT,
  },
  passwordLink: {
    color: COLOR.ACTIVE_COLOR,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: PADDING.PRIMARY_PADDING,
    padding: PADDING.SECONADARY_PADDING,
    fontSize: SIZES.MEDIUM_TEXT,
  },
  labelView: {
    paddingTop: PADDING.SECONADARY_PADDING,
    flexDirection: 'row',
    paddingLeft: PADDING.PRIMARY_PADDING,
    width: WIDTH.SECONDARY_WIDTH,
  },

  lableInput: {
    paddingLeft: PADDING.PRIMARY_PADDING,
    paddingTop: PADDING.NEGATIVE_PADDING,
    paddingBottom: PADDING.NEGATIVE_PADDING,
    width: WIDTH.FULL_WIDTH,
  },
  labelBox: {
    paddingLeft: PADDING.SECONADARY_PADDING,
    fontSize: SIZES.MEDIUM_TEXT,
    fontWeight: 'bold',
    color: COLOR.TEXT_COLOR,
    width: WIDTH.FULL_WIDTH,
    paddingTop: PADDING.SECONADARY_PADDING,
    paddingBottom: PADDING.SECONADARY_PADDING,
  },
  labelList: {
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: PADDING.PRIMARY_PADDING,
  },
  editLabel: {
    width: WIDTH.FULL_WIDTH,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  loader: {
    flex: 1,
    width: WIDTH.FULL_WIDTH,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  trashText: {
    color: COLOR.TEXT_COLOR.TEXT_COLOR,
    fontSize: SIZES.LARGE_TEXT,
    paddingLeft: PADDING.PRIMARY_PADDING,
    fontWeight: 'bold',
    alignContent: 'center',
    justifyContent: 'center',
  },
  list: {
    width: WIDTH.FULL_WIDTH,
    padding: PADDING.SECONADARY_PADDING,
  },
  grid: {
    alignContent: 'center',
    flex: 1,
    paddingBottom: PADDING.SECONADARY_PADDING,
    padding: PADDING.SECONADARY_PADDING,
    height: 100,
  },
  labelText: {
    color: COLOR.TEXT_COLOR,
    fontSize: SIZES.MEDIUM_TEXT,
    fontWeight: 'bold',
    paddingLeft: PADDING.PRIMARY_PADDING,
  },
  window: {
    justifyContent: 'center',
    alignContent: 'center',
    width: WIDTH.FULL_WIDTH,
    paddingTop: PADDING.SECONADARY_PADDING,
    paddingBottom: PADDING.SECONADARY_PADDING,
  },
  labelBar: {
    flexDirection: 'row',
    borderBottomWidth: BORDER.MEDIUM_BORDER,
    borderBottomColor: COLOR.TEXT_COLOR,
    justifyContent: 'flex-start',
    alignContent: 'center',
    flex: 0.1,
    paddingBottom: PADDING.SECONADARY_PADDING,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'space-between',
    paddingTop: PADDING.SECONADARY_PADDING,
  },
  noteBar: {
    justifyContent: 'flex-start',
    height: HEIGHT.BAR_HEIGHT,
    width: WIDTH.FULL_WIDTH,
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    paddingLeft: PADDING.PRIMARY_PADDING,
    flex: 0.1,
  },
  trashBar: {
    backgroundColor: COLOR.SECONDARY,
    height: HEIGHT.BAR_HEIGHT,
    alignContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: PADDING.PRIMARY_PADDING,
    flexDirection: 'row',
  },
  subtitles: {
    color: COLOR.TEXT_COLOR,
    paddingLeft: PADDING.PRIMARY_PADDING,
    paddingTop: PADDING.SECONADARY_PADDING,
    fontSize: SIZES.SMALL_TEXT,
    fontWeight: 'bold',
  },
  editText: {
    color: COLOR.TEXT_COLOR,
    fontSize: SIZES.SMALL_TEXT,
    marginRight: MARGIN.PRIMARY_MARGIN,
  },
  barButton: {
    justifyContent: 'flex-end',
    marginLeft: MARGIN.BUTTON_MARGIN,
    marginBottom: MARGIN.BOTTOM_MARGIN,
  },
  plus: {
    backgroundColor: COLOR.SECONDARY,
    borderRadius: BORDER.BORDER_RADIUS,
    height: HEIGHT.BUTTON_HEIGHT,
    width: WIDTH.BUTTON_WIDTH,
    borderWidth: BORDER.THICK_BORDER,
    borderColor: COLOR.PRIMARY,
    borderBottomColor: COLOR.PRIMARY,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    paddingLeft: PADDING.PRIMARY_PADDING,
    alignContent: 'center',
    justifyContent: 'center',
  },
  bottomIcon: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: PADDING.BOTTOM_PADDING,
    width: WIDTH.FULL_WIDTH,
    backgroundColor: COLOR.SECONDARY,
    height: HEIGHT.BAR_HEIGHT,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: PADDING.SECONADARY_PADDING,
    paddingRight: PADDING.SECONADARY_PADDING,
    justifyContent: 'flex-start',
  },
  topBar: {
    justifyContent: 'space-around',
    backgroundColor: COLOR.SECONDARY,
    height: HEIGHT.BAR_HEIGHT,
    width: WIDTH.FULL_WIDTH,
    borderRadius: BORDER.ROUND_CORNER,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },

  background: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY,
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    flex: SIZES.FLEX,
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
  },
  logo: {
    paddingTop: PADDING.BUTTON_PADDING,
    alignSelf: 'center',
    height: HEIGHT.LOGO_HEIGHT,
    width: WIDTH.LOGO_WIDTH,
    resizeMode: 'contain',
    opacity: SIZES.FLEX,
  },
  output: {
    backgroundColor: COLOR.PRIMARY,
    width: WIDTH.FULL_WIDTH,
    height: HEIGHT.SECTION_HEIGHT,
    borderBottomColor: COLOR.TEXT_COLOR,
    borderBottomWidth: BORDER.THICK_BORDER,
    borderStyle: BORDER.BORDER_STYLE,
    alignItems: 'center',
    borderRadius: BORDER.ROUND_CORNER,
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: PADDING.PRIMARY_PADDING,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLOR.TEXT_COLOR,
    marginBottom: MARGIN.SECONDARY_MARGIN,
    paddingRight: PADDING.PRIMARY_PADDING,
    paddingTop: PADDING.PRIMARY_PADDING,
  },
  title: {
    color: COLOR.TEXT_COLOR,
    fontSize: SIZES.LARGE_TEXT,
    fontWeight: 'bold',
    paddingLeft: PADDING.PRIMARY_PADDING,
  },
  blank: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: PADDING.PRIMARY_PADDING,
    paddingTop: PADDING.PRIMARY_PADDING,
  },
  blankText: {
    color: COLOR.TEXT_COLOR,
    fontSize: SIZES.MEDIUM_TEXT,
    alignItems: 'center',
    paddingTop: PADDING.PRIMARY_PADDING,
    paddingRight: PADDING.SECONADARY_PADDING,
  },
  flatList: {
    flexWrap: 'wrap',
  },
  middle: {
    flex: SIZES.FLEX,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: PADDING.SECONADARY_PADDING,
  },
  middleText: {
    color: COLOR.TEXT_COLOR,
    fontSize: SIZES.MEDIUM_TEXT,
    alignItems: 'center',
    paddingTop: PADDING.SECONADARY_PADDING,
  },
});
