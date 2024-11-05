// Importa las funciones necesarias desde Firebase SDKs
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfigPushNotifications  = {
    apiKey: "AIzaSyBI_2rP-bv4VsOji3FXsx8hW6Jf6vNP0qA",
    authDomain: "notificacionespushr.firebaseapp.com",
    projectId: "notificacionespushr",
    storageBucket: "notificacionespushr.firebasestorage.app",
    messagingSenderId: "413086554130",
    appId: "1:413086554130:web:960ff1710cb3d1dd7f20cb",
    measurementId: "G-EC5YSVDER0"
};

// Inicializa Firebase
const pushNotificationsApp = initializeApp(firebaseConfigPushNotifications, "pushNotificationsApp");

// Obtén la instancia de Firebase Messaging
const messaging = getMessaging(pushNotificationsApp);

export { messaging };