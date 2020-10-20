import React,{useEffect,useState,useCallback} from 'react';

import Routes from './Routes';
//import AuthContext from './shared/context/auth-context';
// import './App.css';

let logoutTimer;

const App = () => {

  // const [token, setToken] = useState(false);
  // const [tokenExpirationDate, setTokenExpirationDate] = useState();
  // const [userId, setUserId] = useState(false);

  // const login = useCallback((uid, token, expirationDate) => {
  //   setToken(token);
  //   setUserId(uid);
  //   const tokenExpirationDate =
  //     expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
  //   setTokenExpirationDate(tokenExpirationDate);
  //   localStorage.setItem(
  //     'userData',
  //     JSON.stringify({
  //       userId: uid,
  //       token: token,
  //       expiration: tokenExpirationDate.toISOString()
  //     })
  //   );
  // }, []);

  // const logout = useCallback(() => {
  //   setToken(null);
  //   setTokenExpirationDate(null);
  //   setUserId(null);
  //   localStorage.removeItem('userData');
  // }, []);

  // useEffect(() => {
  //   if (token && tokenExpirationDate) {
  //     const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
  //     logoutTimer = setTimeout(logout, remainingTime);
  //   } else {
  //     clearTimeout(logoutTimer);
  //   }
  // }, [token, logout, tokenExpirationDate]);

  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem('jwt'));
  //   if (
  //     storedData &&
  //     storedData.token &&
  //     new Date(storedData.expiration) > new Date()
  //   ) {
  //     login(storedData.userId, storedData.token, new Date(storedData.expiration));
  //   }
  // }, [login]);

  return (
    // <AuthContext.Provider 
    //   value={{
    //     isLoggedIn:!!token,
    //     token:token,
    //     userId:userId,
    //     login:login,
    //     logout: logout
    //   }}
      
    // >
    //   {console.log(!!token)}
      <Routes />
    /* </AuthContext.Provider> */
  )

}

export default App;
