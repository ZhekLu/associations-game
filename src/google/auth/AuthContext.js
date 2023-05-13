import React, {createContext, useState} from 'react';

export const AuthContext = createContext({
  accessToken: undefined,
  setAccessToken: undefined,
  profile: undefined,
  setProfile: undefined,
  client: undefined,
  setClient: undefined,
});

export const AuthProvider = ({children}) => {
  const [accessToken, setAccessToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [client, setClient] = useState(null);

  const contextValue = {
    accessToken, setAccessToken, profile, setProfile, client, setClient,
  };

  return <AuthContext.Provider value={contextValue}>
    {children}
  </AuthContext.Provider>;
};
