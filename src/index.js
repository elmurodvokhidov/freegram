import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import ContextData from './utilities/ContextData';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/database'; 

const firebaseConfig = {
  apiKey: "AIzaSyAeyUpul0_tZFnsHPeQZiiYWG8C1jmKuQ8",
  authDomain: "freegram-2bb53.firebaseapp.com",
  projectId: "freegram-2bb53",
  storageBucket: "freegram-2bb53.appspot.com",
  messagingSenderId: "352833183360",
  appId: "1:352833183360:web:3346d098ddc52326f11065"
};

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ContextData>
        <App />
      </ContextData>
    </Router>
  </React.StrictMode>
);
