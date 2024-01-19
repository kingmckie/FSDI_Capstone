// FirebaseContext.js
import React, { createContext, useContext } from 'react';
import db, { auth } from './firebase'; // Adjust the path based on your project structure

const FirebaseContext = createContext();

export function useFirebase() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children }) {
  const value = {
    auth,
    db,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}
