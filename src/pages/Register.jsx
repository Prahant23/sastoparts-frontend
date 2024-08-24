import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerApi } from "../apis/Api";
import bg from "../assets/images/Rectangle 1587.png";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import carr from "../assets/images/Untitled design (2).png";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (setter) => (e) => setter(e.target.value);

  const validatePassword = (password) => {
    let strength = "";
    let error = null;

    if (password.length < 8) {
      error = "Password must be at least 8 characters long.";
      strength = "weak";
    } else if (password.length > 12) {
      error = "Password must be no more than 12 characters long.";
      strength = "weak";
    } else if (!/[A-Z]/.test(password)) {
      error = "Password must contain at least one uppercase letter.";
      strength = "weak";
    } else if (!/[a-z]/.test(password)) {
      error = "Password must contain at least one lowercase letter.";
      strength = "weak";
    } else if (!/\d/.test(password)) {
      error = "Password must contain at least one digit.";
      strength = "medium";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      error = "Password must contain at least one special character.";
      strength = "medium";
    } else {
      strength = "strong";
    }

    setPasswordStrength(strength);
    return error;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const error = validatePassword(newPassword);
    setPasswordError(error);
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "weak":
        return "red";
      case "medium":
        return "orange";
      case "strong":
        return "green";
      default:
        return "#ced4da";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !contactNumber || !address) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      password,
      contactNumber,
      address,
    };

    registerApi(data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Registration failed. Please try again.");
      });
  };

  return (
    <section style={{ backgroundColor: "#cbccd0", color: "cbccd0" }}>
      <div className="d-flex justify-content-start">
        <div className="col-md-9 col-lg-6 col-xl-3 d-none d-md-block">
          <img src={carr} alt="Background" style={{ width: "300%", height: "100%", paddingTop: "200px" }} />
        </div>
        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-4 pt-4">
          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center flex-direction-row">
              <img src={logo} alt="Logo" />
            </div>
            <h2 className="text-center">Register</h2>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="firstName">
                First Name
              </label>
              <input
                onChange={handleChange(setFirstName)}
                type="text"
                id="firstName"
                className="form-control form-control-lg"
                placeholder="Enter your first name"
                value={firstName}
                required
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="lastName">
                Last Name
              </label>
              <input
                onChange={handleChange(setLastName)}
                type="text"
                id="lastName"
                className="form-control form-control-lg"
                placeholder="Enter your last name"
                value={lastName}
                required
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="email">
                Email address
              </label>
              <input
                onChange={handleChange(setEmail)}
                type="email"
                id="email"
                className="form-control form-control-lg"
                placeholder="Enter a valid email address"
                value={email}
                required
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="contactNumber">
                Contact Number
              </label>
              <input
                onChange={handleChange(setContactNumber)}
                type="text"
                id="contactNumber"
                className="form-control form-control-lg"
                placeholder="Enter your contact number"
                value={contactNumber}
                required
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="address">
                Address
              </label>
              <input
                onChange={handleChange(setAddress)}
                type="text"
                id="address"
                className="form-control form-control-lg"
                placeholder="Enter your address"
                value={address}
                required
              />
            </div>
            <div className="form-outline mb-4" style={{ position: 'relative' }}>
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                onChange={handlePasswordChange}
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control form-control-lg"
                placeholder="Enter password"
                value={password}
                required
                style={{
                  borderColor: getPasswordStrengthColor(),
                  transition: "border-color 0.3s ease",
                }}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  top: '70%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
              {passwordFocus && (
                <div
                  className="password-strength"
                  style={{
                    color: getPasswordStrengthColor(),
                    fontSize: '0.875rem',
                    marginTop: '0.5rem',
                  }}
                >
                  Strength: {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                </div>
              )}
              {passwordError && passwordFocus && (
                <div
                  className="password-error"
                  style={{
                    color: 'red',
                    fontSize: '0.875rem',
                    marginTop: '0.25rem',
                  }}
                >
                  {passwordError}
                </div>
              )}
            </div>
            <div className="text-center text-lg-start pt-2">
              <button
                type="submit"
                className="btn btn-lg"
                style={{
                  width: "100%",
                  backgroundColor: "#08b822",
                  color: "white",
                }}
              >
                Register
              </button>
              <p className="small fw-bold mt-2 pt-1 mb-0 text-black">
                Already have an account?{" "}
                <a href="/login" className="link-danger">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
