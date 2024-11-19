import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import * as Sentry from '@sentry/react';

// Inicializar Sentry
Sentry.init({
  dsn: "https://ac6abc01593751ad65146f2790223029@o4508293916327936.ingest.us.sentry.io/4508322643116032",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  tracePropagationTargets: [
    "https://telesecundaria763.host8b.me", // Cambia localhost por el dominio
    /^https:\/\/telesecundaria763\.host8b\.me\/api/,
  ],
  environment: "production", // Asegura que estás etiquetando correctamente los datos
});

// Registro del Service Worker (para PWA o notificaciones push)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
        Sentry.captureException(error); // Captura el error de registro del Service Worker
      });
  });
}

// Funciones para manejar eventos de conexión (Offline/Online)
const handleOffline = () => {
  console.log('Modo Offline detectado');
  Sentry.captureMessage("Modo Offline detectado"); // Envía un mensaje a Sentry
};

const handleOnline = () => {
  console.log('Modo Online detectado');
  Sentry.captureMessage("Modo Online detectado"); // Envía un mensaje a Sentry
};

// Registro de eventos de conexión
window.addEventListener('offline', handleOffline);
window.addEventListener('online', handleOnline);

// Renderizar el componente App como raíz de la aplicación
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
