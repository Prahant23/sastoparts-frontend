import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { forgotPasswordApi, loginApi } from "../apis/Api";
import {  useNavigate } from "react-router-dom";
import bg from "../assets/images/Rectangle 1587.png"
import logo from "../assets/images/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleForgotPasswordEmail = (e) => {
    setForgotPasswordEmail(e.target.value);
  };
  const forgotPassword = (e) => {
    e.preventDefault();
    const data = {
      email: forgotPasswordEmail,
    };
    forgotPasswordApi(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || "Internal server error");
      });
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    loginApi(data)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          navigate("/");

          // Save token in local storage
          localStorage.setItem("token", res.data.token);

          // Save user details in local storage
          localStorage.setItem("user", JSON.stringify(res.data.user));
        } else {
          toast.error(res.data.message);
        }
      }) 
      .catch((err) => {
        console.log(err);
        toast.error("Internal server error");
      });
  };

  // Use useEffect for redirecting to the homepage
  useEffect(() => {
    // Check if some condition is met (for example, user is logged in)
    // If the condition is met, redirect to the homepage
    const isLoggedIn = localStorage.getItem("token");

    if (isLoggedIn) {
      window.location.replace("/");
    }
  }, []);

  return (
    <section style={{backgroundColor:"#051923" , color:"#6FFFE9"}}>
        <div className="d-flex justify-content-center " >
          <div className="col-md-9 col-lg-6 col-xl-5 col-0">
            
            <img src={bg}
             
              alt="Sample image"
              style={{width: "100%", height: "fit-content" }} />
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1 pt-5">
            <form>
              <div class="d-flex justify-content-center flex-direction-row ">
                <img src={logo} alt="logo"/>
               
              </div>
              <h2 className="text-center">Login</h2> 
              <div class="form-outline mb-4">
                <label class="form-label" for="form3Example3">
                  Email address
                </label>
                <input
                  onChange={handleEmail}
                  type="email"
                  id="form3Example3"
                  class="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                />
              </div>

              <div class="form-outline mb-3">
                <label class="form-label" for="form3Example4">
                  Password
                </label>
                <input
                  onChange={handlePassword}
                  type="password"
                  id="form3Example4"
                  class="form-control form-control-lg"
                  placeholder="Enter password"
                />
              </div>

              <div className="mt-3 d-flex justify-content-end w-100">
                <a
                  type="button"
                  className="text-decoration-none text-muted"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Forgot Password?
                </a>

                <div
                  class="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content bg-dark text-white">
                      <div class="modal-header text-center align-items-center">
                        <h5 class="modal-title w-100" id="staticBackdropLabel">
                          Change Password
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <label>Enter your email</label>
                        <input
                          type="email"
                          onChange={handleForgotPasswordEmail}
                          className="form-control text-light"
                          id="email"
                          placeholder="Enter your email"
                          style={{ color: "white" }}
                        />
                      </div>
                      <div class="modal-footer">
                        {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                        <button
                          type="button"
                          class="btn btn-secondary"
                          onClick={forgotPassword}
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-center text-lg-start pt-2">
                <button
                  type="button"
                  class="btn btn-lg " style={{width:"100%",backgroundColor:"#6FFFE9",color:"white"}}
                  onClick={handleSubmit}
                >
                  Login
                </button>
                <p class="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <a href="Register" class="link-danger">
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
    </section>
  );
};

export default Login;
