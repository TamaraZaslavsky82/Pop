import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBqMc7r4xVAsP470L_H_uNMeettc-T_yw4",
    authDomain: "comentarios-3012c.firebaseapp.com",
    projectId: "comentarios-3012c",
    storageBucket: "comentarios-3012c.appspot.com",
    messagingSenderId: "810949401018",
    appId: "1:810949401018:web:1f3539427347264efda583",
    measurementId: "G-QVRGQEDNJX"
};

// Inicializa Firebase con tu configuración
firebase.initializeApp(firebaseConfig);

// Obtén una instancia de Firestore
const db = firebase.firestore();

// Utiliza db para realizar operaciones en Firestore, como agregar comentarios, leer datos, etc.

// Ejemplo de cómo agregar un comentario
const addComment = (nombre, comentario) => {
  return new Promise((resolve, reject) => {
    db.collection('comentarios')
      .add({
        nombre: nombre,
        comentario: comentario,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log('Comentario agregado correctamente');
        resolve();
      })
      .catch((error) => {
        console.error('Error al agregar el comentario:', error);
        reject(error);
      });
  });
};

export { firebase, db, addComment };
