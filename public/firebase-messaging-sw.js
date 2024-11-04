// Import the functions you need from the SDKs you need
importScripts('https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBI_2rP-bv4VsOji3FXsx8hW6Jf6vNP0qA",
  authDomain: "notificacionespushr.firebaseapp.com",
  projectId: "notificacionespushr",
  storageBucket: "notificacionespushr.firebasestorage.app",
  messagingSenderId: "413086554130",
  appId: "1:413086554130:web:960ff1710cb3d1dd7f20cb",
  measurementId: "G-EC5YSVDER0"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const messaging = firebase.messaging(app);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Mensaje en segundo plano recibido:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://robe.host8b.me/assets/main-logo-Dgm6DqGM.png', // Reemplaza con la ruta a tu ícono si lo deseas
    data: { // Aquí puedes almacenar datos adicionales
      url: payload.data.url || '/' // El enlace al que se redirigirá al hacer clic, por defecto la raíz
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Manejar el evento de clic en la notificación
self.addEventListener('notificationclick', function(event) {
  console.log('Notificación clickeada:', event);
  event.notification.close(); // Cerrar la notificación

  // Abre la URL almacenada en data.url
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        // Si la aplicación ya está abierta, enfócate en la pestaña
        let client = clientList[0];
        client.focus();
        return client.navigate(event.notification.data.url);
      }
      // Si la aplicación no está abierta, abre una nueva pestaña con la URL
      return clients.openWindow(event.notification.data.url);
    })
  );
});


