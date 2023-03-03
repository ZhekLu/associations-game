import './App.css';
import './grid.css';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import * as url from './urls';
import Game from './pages/Game';

function App() {
  return (
    <Routes>
      <Route path={url.GAME} element={<Game/>}/>
    </Routes>
  );
}

export default App;
