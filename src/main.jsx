// main.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

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
      });
  });
}

// Funciones para manejar los eventos de conexión
const handleOffline = () => {
  console.log('Modo Offline detectado');
  // Puedes mostrar una notificación o mensaje aquí
};

const handleOnline = () => {
  console.log('Modo Online detectado');
  // Lógica para sincronizar datos o notificar al usuario
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
