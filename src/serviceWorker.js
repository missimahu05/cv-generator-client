// Cette fonction enregistre le service worker
export function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(
        (registration) => {
          console.log('Service Worker enregistré avec succès:', registration.scope);
        },
        (err) => {
          console.log('Échec de l\'enregistrement du Service Worker:', err);
        }
      );
    });
  }
}

// Cette fonction désenregistre le service worker
export function unregisterSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}