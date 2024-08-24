import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { forgotPasswordApi, loginApi, checkSessionApi } from "../apis/Api"; // Import checkSessionApi
import { useNavigate } from "react-router-dom";
import bg from "../assets/images/Rectangle 1587.png";
import logo from "../assets/images/logo.png";
import car from "../assets/images/Untitled design (2).png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  // Session check useEffect
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await checkSessionApi();
        if (!response.data.success) {
          toast.error(response.data.message);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate('/login'); // Redirect to login page
        }
      } catch (error) {
        console.error('Session check failed:', error);
      }
    };

    const interval = setInterval(checkSession, 5 * 60 * 1000); // Check session every 5 minutes
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [navigate]);

  const handleEmailChange = (e) => setEmail(e.target.value.trim());
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleForgotPasswordEmailChange = (e) => setForgotPasswordEmail(e.target.value.trim());

  const forgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail || !/\S+@\S+\.\S+/.test(forgotPasswordEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const response = await forgotPasswordApi({ email: forgotPasswordEmail });
      toast[response.data.success ? 'success' : 'error'](response.data.message);
      if (response.data.success) setModalOpen(false); // Close modal on success
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal server error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
  
    if (!password) {
      toast.error("Please enter your password");
      return;
    }
  
    try {
      const response = await loginApi({ email, password });
  
      if (response.data.success) {
        if (response.data.redirectToChangePassword) {
          navigate('changepassword/:id'); // Redirect to the change password page
          toast.error(response.data.message); // Notify the user
        } else {
          toast.success(response.data.message);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "User not found");
    }
  };
  
  return (
    <section style={{ backgroundColor: "#cbccd0", color: "#cbccd0",  }}>
      <div className="d-flex justify-content-start">
        <div className="col-md-9 col-lg-6 col-xl-5 d-none d-md-block">
          <img src={car} alt="Background"  style={{ 
          width: "150%", 
          height: "700px", 
          objectFit: "cover", // Ensure the image covers the div properly
          alignSelf: "flex-start", // Align the image to the top of the div
          paddingTop:"120px"
          
        }}  />
        </div>
        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-2 pt-4">
          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center flex-direction-row">
              <img src={logo} alt="Logo" />
            </div>
            <h2 className="text-center">Login</h2>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                className="form-control form-control-lg"
                placeholder="Enter a valid email address"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control form-control-lg"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="mt-3 d-flex justify-content-end w-100 text-black">
              <a
                className="text-decoration-none text-muted text-black"
                onClick={(e) => {
                  e.preventDefault();
                  setModalOpen(true);
                }}
              >
                Forgot Password?
              </a>
            </div>
            <div className="text-center text-lg-start pt-2">
              <button
                type="submit"
                className="btn btn-lg"
                style={{ width: "100%", backgroundColor: "#6FFFE9", color: "white" }}
              >
                Login
              </button>
              <p className="small fw-bold mt-2 pt-1 mb-0 text-black">
                Don't have an account?{" "}
                <a href="/register" className="link-danger">Register</a>{" "}
                |{" "}
                <a
                  href="#"
                  className="link-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    setModalOpen(true);
                  }}
                >
                  Forgot Password?
                </a>
              </p>
            </div>
          </form>
          {modalOpen && (
            <div
              className="modal show"
              style={{ display: "block" }}
              role="dialog"
              aria-labelledby="forgotPasswordModalLabel"
              aria-hidden="false"
            >
              <div className="modal-dialog">
                <div className="modal-content bg-dark text-white">
                  <div className="modal-header">
                    <h5 className="modal-title" id="forgotPasswordModalLabel">Reset Password</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setModalOpen(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={forgotPassword}>
                      <label htmlFor="forgotPasswordEmail">Enter your email</label>
                      <input
                        type="email"
                        id="forgotPasswordEmail"
                        className="form-control"
                        placeholder="Enter your email"
                        value={forgotPasswordEmail}
                        onChange={handleForgotPasswordEmailChange}
                        required
                      />
                      <button
                        type="submit"
                        className="btn btn-secondary mt-2"
                      >
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
