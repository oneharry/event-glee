import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { auth } from '../config/firebase.config';
import axios from 'axios';

const AuthContext = createContext();


export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();
    const [allEvents, setEvents] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEvents, setFilteredItems] = useState([]);
    
  
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

      const getAllEvents = async () => {
        try {
          const res = await axios.get('http://localhost:5000/events')
          setEvents(res.data)
          console.log(allEvents)
        } catch (error) {
          console.log("Error loading events")
        }
      }

      const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
    
        const filtered = allEvents.filter(
          (event) =>
            event.name.toLowerCase().includes(query) ||
            event.category.toLowerCase().includes(query)
        );
        setFilteredItems(filtered);
      };

      const value = {
        currentUser,
        login,
        register,
        logout,
        token,
        getUserJWT,
        allEvents,
        getAllEvents,
        handleSearch,
        filteredEvents,
        searchQuery
      }
  
    return (
      <AuthContext.Provider value={ value } >
        {!loading && children}
      </AuthContext.Provider>
    );
  };