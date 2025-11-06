// N\'enregistre le SW qu'en production pour éviter des warnings en dev
if ('serviceWorker' in navigator && import.meta.env.PROD) {
window.addEventListener('load', () => {
navigator.serviceWorker.register('/sw.js').catch(console.error);
});
}