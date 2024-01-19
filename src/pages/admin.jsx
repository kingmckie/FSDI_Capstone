import React, { useState } from 'react';
import { useFirebase } from '../FirebaseContext';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSignup() {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {

      // signed in //
      const user = userCredential.user;
      console.log('Account created', user);

      // set the displayname
      await updateProfile(user, { displayName:username });

      navigate('/login');
    })
    .catch((error) => {
      
      console.log('Error', error.code, error.message);
      setError(error)
    });
  }

  return (
    <div>
      <h4>Create a new account</h4>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Display Name:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default Admin;

