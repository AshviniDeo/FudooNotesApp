import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password, callback, errorCallback) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
            callback();
          } catch (e) {
            console.log(e.code);
            errorCallback(e.code);
          }
        },
        register: async (email, password, userName) => {
          try {
            await auth().createUserWithEmailAndPassword(
              email,
              password,
              userName,
            );
          } catch (e) {
            console.log(e.code);
          }
        },
        signout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
