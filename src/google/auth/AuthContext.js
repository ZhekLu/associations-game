import React, {createContext, useState} from 'react';

export const AuthContext = createContext({
  accessToken: undefined,
  setAccessToken: undefined,
  profile: undefined,
  setProfile: undefined,
  client: undefined,
  setClient: undefined,
  googleLibsLoaded: {gis: undefined, gapi: undefined},
  setGoogleLibsLoaded: undefined,
});

export const AuthProvider = ({children}) => {
  const [accessToken, setAccessToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [client, setClient] = useState(null);
  const [googleLibsLoaded, setGoogleLibsLoaded] = useState({
    gis: false,
    gapi: false,
  });

  const contextValue = {
    accessToken, setAccessToken,
    profile, setProfile,
    client, setClient,
    googleLibsLoaded, setGoogleLibsLoaded,
  };

  return <AuthContext.Provider value={contextValue}>
    {children}
  </AuthContext.Provider>;
};
