import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [signIn, setSignIn] = useState(false);
  const db = firestore();

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
          displayPicture,
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
        googlelogin: async () => {
          try {
            const {idToken} = await GoogleSignin.signIn();
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            await AsyncStorage.setItem('uid', idToken);
            setSignIn(true);
          } catch (error) {
            console.log(error);
          }
        },
        update: async profileImage => {
          try {
            const data = {profileImage};
            const uid = await AsyncStorage.getItem('uid');
            await db.collection('PersonalDetails').doc(uid).update(data);
          } catch (error) {
            console.log(error);
          }
        },
        fetch: async () => {
          try {
            const arr = [];
            const uid = await AsyncStorage.getItem('uid');
            await db
              .collection('PersonalDetails')
              .doc(uid)
              .get()
              .then(data => {
                const profileDetail = data.data();
                arr.push(profileDetail);
              });
            return arr;
          } catch (error) {
            console.log(error);
          }
        },
        getCurrentUser: async () => {
          try {
            return await GoogleSignin.getCurrentUser();
          } catch (error) {
            console.log(error);
          }
        },
        googleSignOut: async () => {
          try {
            await GoogleSignin.signOut();
            await AsyncStorage.clear();
            setSignIn(false);
          } catch (error) {
            console.error(error);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
