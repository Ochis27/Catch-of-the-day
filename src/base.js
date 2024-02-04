import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAk75IWleVm-snVjI-M8ogkSnuhOGA0D9Y",
    authDomain: "catch-of-the-day-13cbe.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-13cbe-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "catch-of-the-day-13cbe",
    storageBucket: "catch-of-the-day-13cbe.appspot.com",
    messagingSenderId: "593168539832",
    appId: "1:593168539832:web:9851de39fa4a6ac84f544d",
    measurementId: "G-NH0MVR6RKL"
};

// Initialize Firebase
const base = initializeApp(firebaseConfig);

// Initialize services
const database = getDatabase(base);
const auth = getAuth(base);


// You can now export these initialized services and use them directly in your components
export { base, database, auth };

