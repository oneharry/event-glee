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
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState();
    const [allEvents, setEvents] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEvents, setFilteredItems] = useState([]);
    const [errmsg, setErrMsg] = useState('');
    const [status, setStatus] = useState('');
    const [loadingTicket, setLoadingTicket] = useState(false);
    
  
    useEffect(() => {
      // Subscribe to Firebase authentication state changes
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        setLoading(false);
        console.log("User", currentUser);
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

      const eventDate = (dateString) => new Date(dateString);

      const getAllEvents = async () => {
        const today = new Date();
        try {
          setLoading(true)
          const res = await axios.get('/api/events')
          const result = res.data.data;
          const upcomingEvents = result.filter((event) => eventDate(event.start) >= today)
          setEvents(upcomingEvents)
          setLoading(false)
        } catch (error) {
          console.log("Error loading events", error)
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
        if (query === '') {
          setFilteredItems(allEvents)
        } else {
          setFilteredItems(filtered);
        }
        
      };


      const setDisplayMsg = (msg, status) => {
        setErrMsg(msg);
        setStatus(status)
      }


      const value = {
        currentUser,
        loading,
        login,
        register,
        logout,
        token,
        getUserJWT,
        allEvents,
        getAllEvents,
        handleSearch,
        filteredEvents,
        searchQuery,
        setDisplayMsg,
        errmsg,
        status,
        handleSearch,
        loadingTicket,
        setLoadingTicket
      }
  
    return (
      <AuthContext.Provider value={ value } >
        { children}
      </AuthContext.Provider>
    );
  };