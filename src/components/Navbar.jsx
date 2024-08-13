import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUserDetail } from "../apis/Api";
import "./Navbar.css";
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSignOutAlt, faShoppingCart, faCalendarAlt, faList, faKey } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  // Retrieve user from localStorage and handle potential JSON parsing errors
  let userFromLocalStorage = {};
  try {
    const storedUser = localStorage.getItem("user");
    userFromLocalStorage = storedUser ? JSON.parse(storedUser) : {};
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
  }

  const [user, setUser] = useState(userFromLocalStorage);
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure user._id exists and is valid before making the API call
    if (user._id && typeof user._id === 'string') {
      getLoggedInUserDetail(user._id)
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user)); // Update localStorage with latest user details
          } else {
            console.error("Failed to fetch user details");
          }
        })
        .catch((err) => {
          console.error("Error fetching user details:", err);
        });
    }
  }, [user._id]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const editProducts = () => navigate("/admin");

  const editOrders = () => navigate("/manageorder");

  const navigateToLogin = () => navigate("/login");

  const navigateToRegister = () => navigate("/register");

  const handleDash = () => navigate("/");

  const changePassword = () => {
    if (user._id) {
      navigate(`/changepassword/${user._id}`);
    } else {
      console.error("User ID is not available for changing password.");
    }
  };

  const placeholderAvatar = "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#dfe1e6" }}>
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
            {user.isAdmin && (
              <>
                <li className="nav-item">
                  <Link to="/admin" className="nav-link" onClick={editProducts} style={{ color: "#FFFFFF" }}>
                    <FontAwesomeIcon icon={faEdit} className="me-1" style={{ fontSize: "1.2rem", color: "#5BC0BE" }} />
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/manageorder" className="nav-link" onClick={editOrders} style={{ color: "#FFFFFF" }}>
                    <FontAwesomeIcon icon={faEdit} className="me-1" style={{ fontSize: "1.2rem", color: "#5BC0BE" }} />
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/bookings" className="nav-link" style={{ color: "#FFFFFF" }}>
                    <FontAwesomeIcon icon={faList} className="me-1" style={{ fontSize: "1.2rem", color: "#5BC0BE" }} />
                    Bookings
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item">
              <Link to="/book-garage" className="btn nav-link" style={{ color: "#5BC0BE" }}>
                <FontAwesomeIcon icon={faCalendarAlt} className="me-1" style={{ fontSize: "1.2rem" }} />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cartpage" className="nav-link" style={{ color: "#FFFFFF" }}>
                <FontAwesomeIcon icon={faShoppingCart} className="me-1" style={{ fontSize: "1.2rem", color: "#5BC0BE" }} />
                <span className="badge rounded-pill badge-notification"></span>
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link to={`/edit-profile/${user._id}`} className="nav-link d-flex align-items-center" style={{ color: "#FFFFFF" }}>
                    <img src={user.avatar || placeholderAvatar} style={{ height: "30px", width: "30px", borderRadius: "50%" }} alt="avatar" />
                  </Link>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn nav-link" 
                    onClick={changePassword} 
                    style={{ color: "#5BC0BE" }} 
                    type="button"
                  >
                    <FontAwesomeIcon icon={faKey} className="me-1" style={{ fontSize: "1.2rem" }} />
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn nav-link" 
                    onClick={logout} 
                    style={{ color: "#5BC0BE" }} 
                    type="button"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-1" style={{ fontSize: "1.2rem" }} />
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button 
                    onClick={navigateToLogin} 
                    className="btn nav-link" 
                    style={{ backgroundColor: "#5BC0BE", color: "white" }} 
                    type="button"
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    onClick={navigateToRegister} 
                    className="btn nav-link" 
                    style={{ backgroundColor: "#5BC0BE", color: "white" }} 
                    type="button"
                  >
                    Register
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
