import React, {createContext, useState} from 'react';
import auth, {firebase} from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const db = firebase.firestore();
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password, callback, errorCallback) => {
          try {
            const userData = await auth().signInWithEmailAndPassword(
              email,
              password,
            );
            await AsyncStorage.setItem('uid', userData.user.uid);

            callback();
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
            db.collection('PersonDetails').doc(userDetails.user.uid).set({
              PhoneNumber: phone,
              DateOfBirth: dateOfBirth,
              UserName: userName,
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
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
