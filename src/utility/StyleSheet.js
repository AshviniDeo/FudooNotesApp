import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
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
  },
});
