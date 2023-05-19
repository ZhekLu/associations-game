import {CLIENT_API_KEY} from '../../consts/google';

export default function initGapiClient(callback) {
  gapi.load('client', () => {
    gapi.client.init({
      apiKey: CLIENT_API_KEY,
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(() => {
      console.log('GAPI client initialized.');
      if (callback) callback();
    }).catch((error) => {
      console.error('Error initializing GAPI client:', error);
    });
  });
}
