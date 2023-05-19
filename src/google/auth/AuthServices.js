export const loadProfile = (accessToken, setProfile) => {
  fetch('https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
    },
  })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response', data);
        const email = data['emailAddresses'].length ?
                data['emailAddresses'][0]['value'] :
                '';
        const firstName = data['names'].length ?
                data['names'][0]['givenName'] :
                '';
        console.log('User login:', email, firstName);
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_name', firstName);
        localStorage.setItem('user_token', accessToken);
        setProfile({
          'username': firstName,
          'email': email,
        });
      })
      .catch((error) => console.error('Failed to fetch profile', error));
};

export const deleteProfile = (setProfile) => {
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_name');
  setProfile(undefined);
};
