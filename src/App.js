import './App.css';
import './grid.css';
import React, {useContext, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import * as url from './consts/urls';
import Game from './pages/Game';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Logout from './pages/Logout';
import {AuthContext} from './google/auth/AuthContext';
import loadGIS from './google/scripts/loadGIS';
import initGISClient from './google/scripts/initGIS';
import {loadProfile} from './google/auth/AuthServices';
import {CLIENT_ID, CLIENT_SCOPE} from './consts/google';
import initGapiClient from './google/scripts/initGapi';
import {getUser, isUserAuth} from './google/auth/user';
import Loading from './pages/Loading';
import loadGapi from './google/scripts/loadGapi';

function App() {
  const {
    accessToken,
    setAccessToken,
    setProfile,
    setClient,
    googleLibsLoaded,
    setGoogleLibsLoaded,
  } = useContext(AuthContext);

  // load google libraries
  useEffect(() => {
    loadGIS(() => {
      setGoogleLibsLoaded((prev) => ({
        ...prev,
        gis: true,
      }));
      initGISClient(
          setAccessToken,
          setClient,
          (token) => loadProfile(token, setProfile),
          CLIENT_ID,
          CLIENT_SCOPE,
      );
    });
    loadGapi(() => {
      initGapiClient(() => {
        setGoogleLibsLoaded((prev) => ({
          ...prev,
          gapi: true,
        }));
        console.log('GAPI inited');
      });
    });
  }, []);

  // load user if needed
  useEffect(() => {
    if (isUserAuth() && !accessToken) {
      const user = getUser();
      setAccessToken(user.token);
      setProfile({
        email: user.email,
      });
    }
  }, []);

  // authorize gapi
  useEffect(() => {
    if (googleLibsLoaded.gapi && accessToken) {
      authorizeGapi();
    }
  }, [googleLibsLoaded.gapi, accessToken]);

  function authorizeGapi() {
    gapi.client.setToken({
      access_token: accessToken,
    });
    console.log('Gapi authorized');
  }

  if (!googleLibsLoaded.gapi || !googleLibsLoaded.gis) {
    return <Loading/>;
  }

  if (isUserAuth()) {
    return <Menu/>;
  }

  return <Login/>;
}

export default App;
