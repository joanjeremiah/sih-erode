import React, { useState, useCallback, useEffect } from 'react';

import './App.css';
import {
  Route,
  HashRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom'
import axios from 'axios';
import Auth from './Components/Auth/Auth';
import MainNavigation from './Containers/Menubar/MainNavigation/MainNavigation';
import { AuthContext } from './context/auth-context'

import Spinner from './Containers/Spinner/Spinner';
import Footer from './Containers/footer/footer'
import { Chat } from './Components/chat/Chat';
import 'react-toastify/dist/ReactToastify.css';
import Preliminary from './Components/questionnaire/Preliminary';
import Podcast from './Components/Podcast/Podcast';
import Home from './Components/Home';
import Secondary from './Components/questionnaire/Secondary';
import Excercise from './Components/Exercise/Excercise'
import ExerciseDetail from './Components/Exercise/ExerciseDetail'
import ChatApp from './Components/ChatApp/ChatApp'
import setAvatar from './Components/ChatApp/SetAvatar'

let logoutTimer;


const App = (props) => {

  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [isLoading, setIsloading] = useState(true)

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setIsloading(false)
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('profileData');
    let token = null
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    setIsloading(false)
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  let route
  let loading
  if (isLoading) {
    loading = (<>
      <div className="container loading">
        <div className="mar-20">
          <Spinner />
        </div>
      </div>
    </>)
  }
  else {
    route = (<>
      {/* {token ? <Route path="/profile/edit/:id" component={CreateProfile} /> : <Redirect to="/auth" />} */}
      {token ? <Route path="/preliminary" component={Preliminary} exact />: <Redirect to="/auth" />}
      {token ? <Route path="/secondary" component={Secondary} exact />: <Redirect to="/auth" />}
      {token ? <Route path="/podcast" component={Podcast} exact />: <Redirect to="/auth" />}
      {token ? <Route path="/exercise" component={Excercise} exact />: <Redirect to="/auth" />}
      {token ? <Route path="/exercise/:id" component={ExerciseDetail} exact />: <Redirect to="/auth" />}
      {token ? <Route path="/chat" component={ChatApp} exact />: <Redirect to="/auth" />}
      {token ? <Route path="/setAvatar" component={setAvatar} exact />: <Redirect to="/auth" />}
    </>
    )
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <div className="App">

        <main>
          <Router>
            <MainNavigation />
            <Switch>
            <Route path="/" component={Home} exact />
              <Route path="/auth" component={Auth} exact />
              {/* <Route path="/chat" component={Chat} exact /> */}
              {route}

            </Switch>
          </Router>
          <Footer />
        </main>
        {loading}

      </div>
    </AuthContext.Provider>
  );
}

export default (App);;
