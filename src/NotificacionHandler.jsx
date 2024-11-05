import React, { useEffect } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { messaging } from './firebase.jsx';

const NotificacionHandler = () => { 
  const apiUrl = 'https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/Docentes/InsertarCalificacionesFinales.php';   //    http://localhost/TeleSecundaria763/Docentes/InsertarCalificacionesFinales.php
  
  const requestPermission = async () => {
    try {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../firebase-messaging-sw.js', { scope: '/firebase/' })
          .then(function(registration) {
            console.log('Service Worker registrado con éxito:', registration);
            
            console.log('Registration successful, scope is:', registration.scope);
          }).catch(function(err) {
            console.log('Service worker registration failed, error:', err);
          })
      }

        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getToken(messaging, { vapidKey: 'BDAEbYvoVXa80RVcHFD0Y3DmRjpltzapP-PO9qlPdJ_JGv8Shk4yaSR8GSMd7Ch_Su-7_vSMTP656YjjFO6aNEU' });
          if (token) {
            console.log("nuevo",token)
            try {
              const response = await fetch(`${apiUrl}/enviarToken.php`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  vchMatricula: usuario,
                  tokenFirebase: token,
                }),
              });

              const result = await response.json();

              if (result.done) {
                console.log(result)
                localStorage.setItem('authTokenFirebase', token);
              }
            } catch (error) {
              console.error('Error 500', error);
              setTimeout(() => {
                alert('Ups, algo salio mal');
              }, 2000);
            }
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
          className: 'custom-toast', // Clase personalizada para dispositivos móviles
          position: "bottom-right",
          progressStyle: {
            background: '#02233a', // Color personalizado
          },
        }
      );
    });
  }, []);

  return <ToastContainer />;
};

export default NotificacionHandler;