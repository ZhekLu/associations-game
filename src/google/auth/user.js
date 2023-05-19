export function getUser() {
  const email = localStorage.getItem('user_email');
  const token = localStorage.getItem('user_token');
  const expires = Number(localStorage.getItem('user_expires'));
  if (email) {
    return {
      email: email,
      token: token,
      expires: expires,
    };
  }
}

export function isUserAuth() {
  const token = localStorage.getItem('user_token');
  const expires = Number(localStorage.getItem('user_expires'));
  if (!token || !expires) {
    return false;
  }
  return expires > Date.now();
}
