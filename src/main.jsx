import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

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
      });
  });
}

// Funciones para manejar eventos de conexión (Offline/Online)
const handleOffline = () => {
  console.log('Modo Offline detectado');
};

const handleOnline = () => {
  console.log('Modo Online detectado');
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
