// inicializarFirebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../config/firebase-credentials.json'); // Cambia la ruta al archivo JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
