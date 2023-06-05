import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBkIJ3mBWCnwLgjSxfNBwAaXhL3gicKoUY",
    authDomain: "typing-speed-test-f4ee1.firebaseapp.com",
    projectId: "typing-speed-test-f4ee1",
    storageBucket: "typing-speed-test-f4ee1.appspot.com",
    messagingSenderId: "539594593457",
    appId: "1:539594593457:web:82364245739b931208fe90",
    measurementId: "G-VZ1GQ8VYV5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();

export {auth, db}