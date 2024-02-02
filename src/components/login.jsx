import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import DataContext from "../state/dataContext";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const setLoggedUser = useContext(DataContext).setLoggedUser;

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setLoggedUser({
          email: user.email,
          displayName: user.displayName,
        });
        // send the user to the home page
        navigate("/");
      })
      .catch((error) => {
        console.log("Error", error.code, error.message);
        // show an error to the user
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setLoggedUser(null); // pass null to clear the logged user
        // send the user to the login page or any other desired page
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error during logout", error.code, error.message);
      });
  };

  return (
    <div className="container">
      <h1 className="title-page"> Login</h1>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Login;
