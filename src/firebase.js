import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyAeyUpul0_tZFnsHPeQZiiYWG8C1jmKuQ8",
    authDomain: "freegram-2bb53.firebaseapp.com",
    projectId: "freegram-2bb53",
    storageBucket: "freegram-2bb53.appspot.com",
    messagingSenderId: "352833183360",
    appId: "1:352833183360:web:3346d098ddc52326f11065"
}).auth();