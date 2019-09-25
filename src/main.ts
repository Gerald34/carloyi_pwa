import './polyfills';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

const VAPID_PUBLIC_KEY = 'BLqOIE4Dh6Iac4pBEVO7Mt0e9eYwwn_sj80NPlk5atVQDE2SCayiWkU_tuJrBA1hB7PuWIvQekQ75PBt0CSJNkA';

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .then(ref => {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef']) {
      window['ngRef'].destroy();
    }
    window['ngRef'] = ref;

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/ngsw-worker.js');
      // send().catch(err => console.error(err));
    }
  }).catch(err => console.error(err));
});

async function send() {
  const register = await navigator.serviceWorker.register('/ngsw-worker.js');

  // Registering push
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
  });

  // Sending Push Notification
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
