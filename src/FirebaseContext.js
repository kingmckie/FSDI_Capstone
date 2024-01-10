
import { createContext, useContext } from 'react';
import app from './firebase';

const FirebaseContext = createContext(null);


export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};


export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={app}>
      {children}
    </FirebaseContext.Provider>
  );
};
