// main.js
// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Inicializa Sentry
/*
Sentry.init({
  dsn: "https://f7f3e9db260cbb3b0bd90b6bbfa7ac5d@o4508293916327936.ingest.us.sentry.io/4508294004277248", // Reemplaza con tu DSN
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0, // Ajusta según tus necesidades
});
*/

// Registrar el Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
        // Sentry.captureException(error); // Captura el error de registro del Service Worker
      });
  });
}

// Funciones para manejar los eventos de conexión
const handleOffline = () => {
  console.log('Modo Offline detectado');
  // Puedes mostrar una notificación o mensaje aquí
  // Sentry.captureMessage("Modo Offline detectado"); // Envía un mensaje a Sentry
};

const handleOnline = () => {
  console.log('Modo Online detectado');
  // Lógica para sincronizar datos o notificar al usuario
  // Sentry.captureMessage("Modo Online detectado"); // Envía un mensaje a Sentry
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
