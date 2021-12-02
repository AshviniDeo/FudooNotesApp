import React, { createContext,useState } from 'react';
import auth from '@react-native-firebase/auth';


export const AuthContext = createContext();

export const AuthProvider =({children})=>{
    const [user, setUser] = useState(null)
    <AuthContext.Provider  value={{
            user,
            setUser,
            login:async(email,password)=>{
                try{
                   await auth().signInWithEmailAndPassword(email,password);
                }
                catch(e){
                    console.log(e);
                }
            },
            register:async(email,password)=>{
                try{
                   await auth().createUserWithEmailAndPassword(email,password);
                }
                catch(e){
                    console.log(e);
                }
            },
            signout:async()=>
            try {
                await auth.signout();
            } catch (e) {
                console.log(e);
            }
    }}>
       
        {children}
    </AuthContext.Provider>
}