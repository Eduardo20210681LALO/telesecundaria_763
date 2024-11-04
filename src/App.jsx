// App.jsx
import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import NotificacionHandler from './NotificacionHandler';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    console.log('useEffect ejecutado en App');

    const handleOffline = () => {
      console.log('Modo Offline detectado');
      toast.error('Estás en modo Offline', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

    const handleOnline = () => {
      console.log('Modo Online detectado');
      toast.success('Estás en línea', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <NotificacionHandler />
      <ToastContainer />
    </>
  );
}

export default App;
