
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { FirebaseProvider } from './FirebaseContext'; 
//import firebaseApp from './firebase';
//import { firestore } from './firebase';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Log the Firebase app instance for verification (optional)
//console.log('Firebase App instance:', firestore);



