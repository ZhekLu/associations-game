const loadGIS = (callback) => {
  const existingScript = document.getElementById('gis');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.id = 'gis';
    document.body.appendChild(script);
    script.onload = () => {
      console.log('GIS is loaded.');
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
export default loadGIS;
