import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDv1MYLBM9QUiwXcX9NVjogbByotrMqn8w",
    authDomain: "zumtype.firebaseapp.com",
    projectId: "zumtype",
    storageBucket: "zumtype.appspot.com",
    messagingSenderId: "218331012295",
    appId: "1:218331012295:web:bfb590638fb9cc5a5272e2",
    measurementId: "G-222D4T8KL7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);