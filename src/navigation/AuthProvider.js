import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [signIn, setSignIn] = useState(false);
  const db = firestore();

  const getUid = async () => {
    return await AsyncStorage.getItem('uid');
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        setSignIn,
        login: async (email, password, errorCallback) => {
          try {
            const userData = await auth().signInWithEmailAndPassword(
              email,
              password,
            );
            await AsyncStorage.setItem('uid', userData.user.uid);
            setSignIn(true);
          } catch (e) {
            console.log(e.code);
            errorCallback(e.code);
          }
        },
        register: async (
          email,
          password,
          callback,
          errorCallback,
          phone,
          dateOfBirth,
          userName,
        ) => {
          try {
            const userDetails = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );
            db.collection('PersonalDetails').doc(userDetails.user.uid).set({
              PhoneNumber: phone,
              DateOfBirth: dateOfBirth,
              UserName: userName,
              Email: email,
            });
            callback();
          } catch (e) {
            console.log(e.code);
            errorCallback(e.code);
          }
        },
        signout: async () => {
          try {
            await auth().signOut();
            await AsyncStorage.removeItem('uid');
            setSignIn(false);
          } catch (e) {
            console.log(e);
          }
        },

        fetchNoteData: async () => {},
      }}>
      {children}
    </AuthContext.Provider>
  );
};
