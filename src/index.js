import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {AuthProvider} from './google/auth/AuthContext';
import {GameProvider} from './context/GameContext';
import {ProcessProvider} from './context/ProcessContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <AuthProvider>
        <GameProvider>
          <ProcessProvider>
            <BrowserRouter>
              <App/>
            </BrowserRouter>
          </ProcessProvider>
        </GameProvider>
      </AuthProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
