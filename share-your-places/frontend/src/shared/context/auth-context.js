

import React, { createContext, useCallback, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    //setIsLoggedIn(true);
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()

      })
    );
  }, []);

  const logout = useCallback(() => {
    //setIsLoggedIn(false);
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  return (

    <AuthContext.Provider value={{ /*isLoggedIn: isLoggedIn*/ token: token, isLoggedIn: !!token, userId: userId, tokenExpirationDate: tokenExpirationDate, login: login, logout: logout }}>
      {props.children}

    </AuthContext.Provider>
  );
}

export default AuthContextProvider;