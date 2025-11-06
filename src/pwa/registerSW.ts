// N'enregistre le SW qu'en production
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    const swUrl = `${import.meta.env.BASE_URL}sw.js`; // respecte base=/vtc-bonus-pwa/
    navigator.serviceWorker.register(swUrl).catch(console.error);
  });
}