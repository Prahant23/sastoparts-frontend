import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerApi } from "../apis/Api";
import bg from "../assets/images/Rectangle 1587.png";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    registerApi(data)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          navigate("/login"); // Redirect to login page after successful registration
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal server error");
      });
  };

  return (
    <section style={{ backgroundColor: "#051923", color: "#6FFFE9" }}>
      <div className="d-flex justify-content-center">
        <div className="col-md-9 col-lg-6 col-xl-5 col-0">
          <img
            src={bg}
            alt="Sample image"
            style={{ width: "100%", height: "fit-content" }}
          />
        </div>
        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 pt-5">
          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center flex-direction-row">
              <img src={logo} alt="logo" />
            </div>
            <h2 className="text-center">Register</h2>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="firstName">
                First Name
              </label>
              <input
                onChange={handleFirstName}
                type="text"
                id="firstName"
                className="form-control form-control-lg"
                placeholder="Enter your first name"
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="lastName">
                Last Name
              </label>
              <input
                onChange={handleLastName}
                type="text"
                id="lastName"
                className="form-control form-control-lg"
                placeholder="Enter your last name"
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="email">
                Email address
              </label>
              <input
                onChange={handleEmail}
                type="email"
                id="email"
                className="form-control form-control-lg"
                placeholder="Enter a valid email address"
              />
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                onChange={handlePassword}
                type="password"
                id="password"
                className="form-control form-control-lg"
                placeholder="Enter password"
              />
            </div>
            <div className="text-center text-lg-start pt-2">
              <button
                type="submit"
                className="btn btn-lg"
                style={{
                  width: "100%",
                  backgroundColor: "#6FFFE9",
                  color: "white",
                }}
              >
                Register
              </button>
              <p className="small fw-bold mt-2 pt-1 mb-0">
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
