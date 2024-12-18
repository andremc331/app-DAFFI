// serviceWorkerRegistration.js
// Este código irá registrar o Service Worker quando o app for executado em produção

// Verifica se o browser suporta Service Worker
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      window.location.hostname === '[::1]' ||
      window.location.hostname === '127.0.0.1'
  );
  
  export function register() {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
      if (isLocalhost) {
        // Em localhost, podemos verificar se há um service worker instalado
        checkValidServiceWorker(swUrl);
      } else {
        // Registra o Service Worker em produção
        registerValidSW(swUrl);
      }
    }
  }
  
  function registerValidSW(swUrl) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('Service Worker registrado: ', registration);
      })
      .catch((error) => {
        console.error('Falha ao registrar o Service Worker: ', error);
      });
  }
  
  function checkValidServiceWorker(swUrl) {
    // Verifique se o service worker pode ser encontrado.
    fetch(swUrl)
      .then((response) => {
        if (
          response.status === 404 ||
          response.headers.get('content-type').indexOf('javascript') === -1
        ) {
          // Se não houver um SW válido, desregistre-o
          navigator.serviceWorker.ready.then((registration) => {
            registration.unregister();
          });
        } else {
          // Se houver um SW válido, registre-o
          registerValidSW(swUrl);
        }
      })
      .catch(() => {
        console.log(
          'Nenhum serviço de rede encontrado. Seu aplicativo funciona offline.'
        );
      });
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }