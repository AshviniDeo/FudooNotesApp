import React, {useState, useContext, useEffect, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import {AuthContext} from './AuthProvider';
import {AppStack} from './AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/SplashScreen';

const Routes = () => {
  const {signIn, setSignIn} = useContext(AuthContext);
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const getUid = useCallback(async () => {
    const val = await AsyncStorage.getItem('uid');
    setId(val);
    if (val) {
      setSignIn(true);
    }
    setIsLoading(false);
  }, [setSignIn]);

  useEffect(() => {
    getUid();
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
