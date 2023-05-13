import {CLIENT_API_KEY} from '../../consts/google';

export default function initGapiClient(callback) {
  const init = async () => {
    await gapi.client.init({
      apiKey: CLIENT_API_KEY,
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    });
  };
  gapi.load('client', init);
  if (!!callback) callback();
}
