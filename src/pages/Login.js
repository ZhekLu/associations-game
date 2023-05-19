import React, {useContext, useEffect, useState} from 'react';
import './Menu.css';
import {AuthContext} from '../google/auth/AuthContext';
import getGames from '../google/sheets/store';


export default function Login() {
  const {
    profile,
    client,
    googleLibsLoaded,
  } = useContext(AuthContext);

  useEffect(() => {
    async function f() {
      console.log('profile changed', profile);
      await getGames();
    }

    f();
  }, [profile]);

  function getToken() {
    client.requestAccessToken();
  }

  return (
    <div className='overlay'>
      <section className='menu-body col-lg-4 col-md-4 col-sm-6 col-xs-12'>
        {googleLibsLoaded.gis && client ?
                    <h1>Sign In with Google</h1> :
                    <h1>Loading...</h1>
        }
        {googleLibsLoaded.gis && client &&
                    <button className='menu-button' onClick={() => getToken()}>
                        Sign In
                    </button>
        }
      </section>
    </div>
  );
}
