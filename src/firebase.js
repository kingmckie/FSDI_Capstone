import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: 'AIzaSyAOPMrFXlYync5OYYPrDZmyXrdSXPeoRRk',
  authDomain: 'hares-and-wabbits.firebaseapp.com',
  projectId: 'hares-and-wabbits',
  storageBucket: 'hares-and-wabbits.appspot.com',
  messagingSenderId: '902561613372',
  appId: 'G-1E2TYPFKW3'
};

console.log("Initializing Firebase");

export const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app);
const db = getFirestore(app);

export default db;