import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { auth } from '../config/firebase.config';

const AuthContext = createContext();


export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();
  
    useEffect(() => {
      // Subscribe to Firebase authentication state changes
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        setLoading(false);
      });
  
      // Clean up the subscription on unmount
      return () => unsubscribe();
    }, []);

    const getUserJWT = async () => {
      const tok = await currentUser.getIdToken();
      setToken(tok);
      return tok;
    }
    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
      }

      const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
      }

      const logout = () => {
        return signOut(auth);
      }

      const value = {
        currentUser,
        login,
        register,
        logout,
        token,
        getUserJWT
      }
  
    return (
      <AuthContext.Provider value={ value } >
        {!loading && children}
      </AuthContext.Provider>
    );
  };