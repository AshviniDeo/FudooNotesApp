import React, {useState, useContext, useEffect, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import {AuthContext} from './AuthProvider';
import {AppStack} from './AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/SplashScreen';
import {LogBox} from 'react-native';

const Routes = () => {
  const {signIn, setSignIn} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const getUid = useCallback(async () => {
    const val = await AsyncStorage.getItem('uid');

    if (val) {
      setSignIn(true);
    }
    setIsLoading(false);
  }, [setSignIn]);

  useEffect(() => {
    getUid();
    LogBox.ignoreAllLogs(true);
  }, [getUid]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {!signIn ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};

export default Routes;
