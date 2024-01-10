
import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

// ... (previous imports and code)

function Navbar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
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
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/livestream">
                  Livestream
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/group">
                  Group
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/createblog">
                  Create Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <div className="user-info">
                <i className="fas fa-user-circle"></i>
                <label>User</label>
              </div>
              <Link className="btn btn-outline-light" to="/cart">
                <label className="count">0</label>
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </form>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navbar;
  