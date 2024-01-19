
import React, { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import DataContext from '../state/dataContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const setLoggedUser = useContext(DataContext).setLoggedUser;

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setLoggedUser({
                    email: user.email,
                    displayName: user.displayName
                });
                // send the user to the home page
                navigate("/");
            })
            .catch((error) => {
                console.log('Error', error.code, error.message);
                // show an error to the user
            });
    };

    return (
        <div className='container'>
            <h1>Login</h1>
            <div>
                <label>Email:</label>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
