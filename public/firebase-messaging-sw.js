// Import the functions you need from the SDKs you need
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
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
    icon: 'https://robe.host8b.me/assets/main-logo-Dgm6DqGM.png',
    data: {
      url: payload.data.url || '/'
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


self.addEventListener('notificationclick', function(event) {
  console.log('Notificación clickeada:', event);
  event.notification.close();


  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
      
        let client = clientList[0];
        client.focus();
        return client.navigate(event.notification.data.url);
      }
    
      return clients.openWindow(event.notification.data.url);
    })
  );
});


