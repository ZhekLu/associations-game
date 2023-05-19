const loadGapi = (callback) => {
  const existingScript = document.getElementById('gapi');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.id = 'gapi';
    document.body.appendChild(script);
    script.onload = () => {
      console.log('Gapi is loaded.');
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
export default loadGapi;
