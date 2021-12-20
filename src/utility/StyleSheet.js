import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log('Height : ', windowHeight);
console.log('Width :', windowWidth);

const COLOR = 'rgba(0,0,0,0.9)';

export const styles = StyleSheet.create({
  trashText: {
    color: COLOR,
    fontSize: 20,
    left: 25,
    fontWeight: 'bold',
    alignContent: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '90%',
  },
  grid: {
    width: '50%',
    left: 5,
    right: 5,
  },
  labelText: {
    color: COLOR,
    fontSize: 18,
    fontWeight: 'bold',
    left: 10,
  },
  window: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 20,
  },
  labelBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLOR,
    width: '100%',
    paddingBottom: 5,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    height: 50,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    left: 10,
    top: 5,
    bottom: 5,
  },
  noteBar: {
    justifyContent: 'flex-start',
    height: '6%',
    width: '100%',
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    left: 15,
  },
  trashBar: {
    backgroundColor: '#e6e6fa',
    height: '7%',
    alignContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    flexDirection: 'row',
  },
  subtitles: {
    color: 'rgba(0,0,0,0.8)',
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  plus: {
    backgroundColor: '#e6e6fa',
    borderRadius: 50,
    height: 90,
    width: 90,
    borderWidth: 8,
    borderColor: 'white',
    borderBottomColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 50,
  },
  icon: {
    paddingLeft: 10,
  },
  bottomIcon: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    width: '100%',
    backgroundColor: '#e6e6fa',
    height: '8%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  topBar: {
    justifyContent: 'space-around',
    backgroundColor: '#e6e6fa',
    height: '7%',
    width: '100%',
    borderRadius: 20,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'white',
    height: windowHeight,
    width: windowWidth,
  },
  background: {
    flex: 1,
    backgroundColor: 'white',
    opacity: 0.9,
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    margin: 10,
    justifyContent: 'flex-start',
    alignContent: 'space-between',
  },
  logo: {
    top: 50,
    alignSelf: 'center',
    height: 170,
    width: 170,
    resizeMode: 'contain',
    opacity: 1,
  },
  output: {
    backgroundColor: 'white',
    width: '80%',
    height: 70,
    borderBottomColor: COLOR,
    borderBottomWidth: 5,
    borderStyle: 'solid',
    alignItems: 'center',
    borderRadius: 9,
    justifyContent: 'center',
    alignContent: 'center',
    left: '15%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLOR,
    marginBottom: 30,
    right: '15%',
    top: 30,
  },
  title: {
    color: COLOR,
    fontSize: 20,
    fontWeight: 'bold',
    left: 10,
  },
  blank: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    left: '5%',
    top: '40%',
  },
  blankText: {
    color: COLOR,
    fontSize: 18,
    alignItems: 'center',
    top: 15,
    right: 10,
  },
  flatList: {
    flexWrap: 'wrap',
  },
  middle: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    left: '3%',
  },
  middleText: {
    color: COLOR,
    fontSize: 20,
    alignItems: 'center',
    top: 10,
  },
});
