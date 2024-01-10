import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyAOPMrFXlYync5OYYPrDZmyXrdSXPeoRRk',
  authDomain: 'hares-and-wabbits.firebaseapp.com',
  projectId: 'hares-and-wabbits',
  storageBucket: 'hares-and-wabbits.appspot.com',
  messagingSenderId: '902561613372',
  appId: 'G-1E2TYPFKW3'
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;