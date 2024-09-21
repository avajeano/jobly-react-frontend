/**
 * Parent component of the frontend application. 
 * State, localStorage and context for logged in users.
 */

import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import './App.css';
import NavBar from './NavBar';
import Routes from './Routes';
import UserContext from './UserContext';
import API from './api';
import useLocalStorage from './useLocalStorage';

function App() {
  // localStorage hook for JWT token
  const [token, setToken] = useLocalStorage('token', null);
  // state for logged in user 
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      if (token) {
        try {
          // retrieving the username from the token
          const { username } = jwtDecode(token);
          API.token = token;
          const user = await API.getUser(username);
          setCurrentUser(user);
        } catch (error) {
          console.error("failed to fetch user", error);
          setCurrentUser(null);
        }
      }
    }
    fetchUser();
  }, [token]);

  const logout = ()  => {
    setToken(null);
    setCurrentUser(null);
    // clear token from API class
    API.token = null;
  }

  return (
    // provider wraps around the app
    <UserContext.Provider value={{ currentUser, setToken, logout, setCurrentUser }}>
      <NavBar />
      <Routes />
    </UserContext.Provider>
  )
}

export default App
