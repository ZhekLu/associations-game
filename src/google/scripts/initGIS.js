export default function initGISClient(
    setToken,
    setClient,
    callback,
    clientId,
    clientScope,
) {
  setClient(google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: clientScope,
    ux_mode: 'popup',
    callback: (response) => {
      console.log('OAuth resp', response);
      setToken(response.access_token);
      const expiresDate = new Date();
      expiresDate.setSeconds(
          expiresDate.getSeconds() + response.expires_in - 10,
      );
      localStorage.setItem('user_expires', expiresDate.getTime().toString());
      callback(response.access_token);
    },
  }));
  console.log('Client inited');
}
