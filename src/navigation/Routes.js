import React, {useState, useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import {AppStack} from './AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/SplashScreen';

const Routes = () => {
  const {signIn, setSignIn} = useContext(AuthContext);
  const {initialize, setInitialize} = useState(true);
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const getUid = React.useCallback(async () => {
    const val = await AsyncStorage.getItem('uid');
    setId(val);
    if (val) setSignIn(true);
    setIsLoading(false);
  }, [setSignIn]);

  const onAuthStateChanged = user => {
    // setUser(user);
    if (initialize) setInitialize(false);
  };

  useEffect(() => {
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    getUid();
    // return subscriber;
  }, [getUid]);

  // if (initialize) return null;
  if (isLoading) return <SplashScreen />;
  console.log('----' + id);

  return (
    <NavigationContainer>
      {!signIn ? <AuthStack /> : <AppStack />}
      {/* <AuthStack /> */}
    </NavigationContainer>
  );
};

export default Routes;
