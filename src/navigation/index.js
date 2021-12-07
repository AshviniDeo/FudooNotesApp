import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';
import 'react-native-gesture-handler';
const Providers = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
export default Providers;
