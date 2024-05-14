import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';



const firebaseConfig = {
    apiKey: "AIzaSyAnoXyH5Soa_Ae1tiNTtBMZuDjysCtaCSQ",
    authDomain: "chat-app-f3411.firebaseapp.com",
    projectId: "chat-app-f3411",
    storageBucket: "chat-app-f3411.appspot.com",
    messagingSenderId: "77260497720",
    appId: "1:77260497720:web:87d94db43600b37c8517cd",
    measurementId: "G-WNCYH5EH13"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider}
  export default db;
