import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
  // Get user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Logout function
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
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand text-danger fw-blod" to="/">
            Vintuff
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
                <button onClick={handledash}>Home</button> 
              </li>
            </ul>
            <Link to="/cartpage" className="m-4">
              <i className="fa fa-shopping-cart fa-lg"></i>
              <span className="badge rounded-pill badge-notification bg-danger"></span>
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
                      Welcome mylord {user.firstName}
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
                  <button onClick={navigatetologin} className="btn btn-outline-danger" type="submit">
                    Login
                  </button>
                  <button onClick={navigatetoregister} className="btn btn-outline-success" type="submit">
                    Register
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;