import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import DataContext from "../state/dataContext";
import "./navbar.css";

function Navbar() {
  const user = useContext(DataContext).user;
  const isLoggedIn = useContext(DataContext).isLoggedIn;

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      data-bs-theme="dark"
    >
      <div className="container-fluid justify-content-center bg-dark border-bottom border-body">
        <Link className="navbar-brand text-white" to="/">
          <img
            src="./images/Hash run picture.jpg"
            alt="Hares and Wabbits Logo"
            style={{ width: "50px", height: "50px" }}
          />{" "}
          Hares and Wabbits
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item me-5">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="/livestream">
                Livestream
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="/group">
                Group
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="/createblog">
                Create Blog
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="/geospatial">
                GeoSpatial
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
            </li>
            
            <li className="nav-item me-5">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            {user.displayName ? (
              <div className="user-info">
                <i className="fas fa-user-circle"></i>
                <label>{user.displayName}</label>
              </div>
            ) : null}
           
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
