import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Ensure Bootstrap dropdown works properly

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          {/* Navbar Brand with Emblem */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/images/emblem.jpg" // Correct path to the emblem image
              alt="Emblem"
              style={{ width: "35px", height: "35px", marginRight: "10px" }}
            />
            <span className="fw-bold">Subsidy Portal</span>
          </Link>

          {/* Toggler for Mobile View */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {/* About */}
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>

              {/* Contact */}
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>

              {/* Help */}
              <li className="nav-item">
                <Link className="nav-link" to="/help">
                  Help
                </Link>
              </li>

              {/* Dropdown Login Menu */}
              {/* <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Login
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/login/user">
                      User Login
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/login/mediator">
                      Mediator Login
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/login/government">
                      Government Login
                    </Link>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
