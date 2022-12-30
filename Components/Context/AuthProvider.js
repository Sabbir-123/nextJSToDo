import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/Firebase.init';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'

export const AuthContext = createContext();
const auth = getAuth(app)
const AuthpProvider = ({children}) => {

    const googleProvider = new GoogleAuthProvider ();
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
      }
      const updateUser = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }
    
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signinGoogle=()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logout =()=>{
        setLoading(true);
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
    
        return () => {
          unsubscribe()
        }
      }, [])

      const authDetails = {
        user, 
        loading,
        createUser, 
        updateUser, 
        signinGoogle,
        signIn,
        setLoading,
        logout
    }
    return (
        <div>
            <AuthContext.Provider value={authDetails}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthpProvider;