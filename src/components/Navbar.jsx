import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit, faSignOutAlt, faShoppingCart, faCalendarAlt, faList } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const editProducts = () => {
    navigate("/admin");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  const handleDash = () => {
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#1C2541" }}>
      <div className="container-fluid mx-2">
        <Link className="navbar-brand text-danger fw-bold" to="/" onClick={handleDash}>
          <img src={logo} alt="logo" style={{ height: "50px" }} />
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
            {user && user.isAdmin && (
              <li className="nav-item">
                <Link to="/admin" className="nav-link" onClick={editProducts} style={{ color: "#FFFFFF" }}>
                  <FontAwesomeIcon icon={faEdit} className="me-1" style={{ fontSize: "1.2rem", color: "#5BC0BE" }} />
                  Edit Products
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/book-garage" className="btn nav-link" style={{ color: "#5BC0BE" }}>
                <FontAwesomeIcon icon={faCalendarAlt} className="me-1" style={{ fontSize: "1.2rem" }} />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/bookings" className="btn nav-link" style={{ color: "#5BC0BE" }}>
                <FontAwesomeIcon icon={faList} className="me-1" style={{ fontSize: "1.2rem" }} />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cartpage" className="nav-link" style={{ color: "#FFFFFF" }}>
                <FontAwesomeIcon icon={faShoppingCart} className="me-1" style={{ fontSize: "1.2rem", color: "#5BC0BE" }} />
                <span className="badge rounded-pill badge-notification"></span>
              </Link>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <Link to={`/edit-profile/${user._id}`} className="nav-link" style={{ color: "#FFFFFF" }}>
                    <FontAwesomeIcon icon={faUser} className="me-1" style={{ fontSize: "1.2rem", color: "#5BC0BE" }} />
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn nav-link" onClick={logout} style={{ color: "#5BC0BE" }}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-1" style={{ fontSize: "1.2rem" }} />
                  </button>
                </li>
              </>
            )}
            {!user && (
              <>
                <li className="nav-item">
                  <button onClick={navigateToLogin} className="btn nav-link" style={{ backgroundColor: "#5BC0BE", color: "white" }} type="button">
                    login
                  </button>
                </li>
                <li className="nav-item">
                  <button onClick={navigateToRegister} className="btn nav-link" style={{ backgroundColor: "#5BC0BE", color: "white" }} type="button">
                    register
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
