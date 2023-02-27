import React from 'react';
import './App.css';

const API_KEY='AIzaSyAVz06VqhIbGSv9w-_9r6sAZkVQOmTzeMs'
const CLIENT_ID='783151919122-ajv3ps6eub7mhs0bltaral5u8brg5g9m.apps.googleusercontent.com'
const SPREADSHEET_ID='1ZZIYP7pqwMg5kbwJQfeSC_Ps9Br-_Pyld236OUIbnh0'
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';


function getDoc() {

}

function addDoc() {

}


function App() {
  gapi.load()
  return (
    <div className="App App-header">
      <button onClick={addDoc}>Add</button>
      <button onClick={getDoc}>Get</button>
    </div>
  );
}

export default App;
