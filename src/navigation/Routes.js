import React, {useState, useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import AppStack from './AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const {initialize, setInitialize} = useState(true);
  const onAuthStateChanged = user => {
    setUser(user);
    if (initialize) setInitialize(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initialize) return null;
  const getUid = async () => {
    return await AsyncStorage.getItem('uid');
  };
  const id = getUid();

  return (
    <NavigationContainer>
      {id === null ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};

export default Routes;
