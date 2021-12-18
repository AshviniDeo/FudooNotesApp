import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log('Height : ', windowHeight);
console.log('Width :', windowWidth);

export const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    height: windowHeight,
    width: windowWidth,
  },
  background: {
    height: '100%',
    width: '100%',
    opacity: 0.7,
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
    backgroundColor: 'darkslategrey',
    width: '75%',
    height: 50,
    borderBottomColor: '#cd853f',
    borderBottomWidth: 5,
    borderStyle: 'solid',
    alignItems: 'center',
    borderRadius: 9,
    justifyContent: 'center',
    alignContent: 'center',
    left: '15%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    right: '15%',
    top: 30,
  },
});
