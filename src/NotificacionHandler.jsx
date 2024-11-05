import React, { useEffect } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { messaging } from './firebase.jsx';

const NotificacionHandler = () => {
  const requestPermission = async () => {
    try {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../firebase-messaging-sw.js', { scope: '/firebase/' })
          .then(registration => {
            console.log('Service Worker registrado con éxito:', registration);
          })
          .catch(err => {
            console.log('Error al registrar el Service Worker:', err);
          });
      }

      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getToken(messaging, { vapidKey: 'BDAEbYvoVXa80RVcHFD0Y3DmRjpltzapP-PO9qlPdJ_JGv8Shk4yaSR8GSMd7Ch_Su-7_vSMTP656YjjFO6aNEU' });
        if (token) {
          console.log("Token de Firebase obtenido:", token);
        }
      } else {
        console.log('Permiso de notificación denegado.');
      }
    } catch (error) {
      console.error('Error al solicitar permiso de notificación:', error);
    }
  };

  useEffect(() => {
    requestPermission();
    onMessage(messaging, message => {
      console.log('Mensaje recibido en primer plano:', message);
      toast(
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span role="img" aria-label="notification-icon">🔔</span>
            <h1>{message.notification.title}</h1>
          </div>
          <p>{message.notification.body}</p>
        </div>,
        {
          className: 'custom-toast',
          position: "bottom-right",
          progressStyle: {
            background: '#02233a',
          },
        }
      );
    });
  }, []);

  return <ToastContainer />;
};

export default NotificacionHandler;
