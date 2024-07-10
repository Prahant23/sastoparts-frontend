// components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const editproducts = () => {
    navigate("/admin");
  };

  const navigatetologin = () => {
    navigate("/login");
  };

  const navigatetoregister = () => {
    navigate("/register");
  };

  const handledash = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#1C2541" }}>
        <div className="container-fluid mx-2">
          <Link className="navbar-brand text-danger fw-bold" to="/" onClick={handledash}>
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
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <Link to="/cartpage" className="m-4">
              <i className="fa fa-shopping-cart fa-lg" style={{ color: "#5BC0BE" }}></i>
              <span className="badge rounded-pill badge-notification"></span>
            </Link>
            <form className="d-flex gap-4" role="search">
              {user ? (
                <>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Welcome, {user.firstName}
                    </button>
                    <ul className="dropdown-menu">
                      {user.isAdmin && (
                        <li>
                          <button onClick={editproducts} className="dropdown-item" to="./admin">
                            Edit Products
                          </button>
                        </li>
                      )}
                      <li>
                        <Link className="dropdown-item" to={`/edit-profile/${user._id}`}>
                          Edit Profile
                        </Link>
                      </li>
                      <li>
                        <button onClick={logout} className="dropdown-item" to="./logout">
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <button onClick={navigatetologin} className="btn" style={{ backgroundColor: "#5BC0BE", color: "white" }} type="submit">
                    Login
                  </button>
                  <button onClick={navigatetoregister} className="btn" style={{ backgroundColor: "#5BC0BE", color: "white" }} type="submit">
                    Register
                  </button>
                </>
              )}
              <Link to="/book-garage" className="btn" style={{ backgroundColor: "#5BC0BE", color: "white" }}>
                Book a Garage
              </Link>
              <Link to="/bookings" className="btn" style={{ backgroundColor: "#5BC0BE", color: "white" }}>
                Booking List
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
