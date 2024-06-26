import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerApi } from "../apis/Api";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h1 className="mb-4 text-center text-danger">Create an Account</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  onChange={handleFirstName}
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={handleLastName}
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={handleEmail}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={handlePassword}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-danger btn-block"
                style={{ borderRadius: "10px", background: "linear-gradient(to right, #FF416C, #FF4B2B)" }}
              >
                Register
              </button>
              <p className="mt-3 text-center">
                Already have an account? <a href="login">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;