import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPasswordApi } from "../apis/Api";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error messages

  const handleNewPassword = (e) => setNewPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const data = { password: newPassword };

    resetPasswordApi(data, token)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/");
        } else {
          setErrorMessage(res.data.message); // Set the error message from the backend
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err.response?.data?.message || "Internal server error");
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Password Reset</h3>
              <form>
                {errorMessage && (
                  <div className="alert alert-danger">
                    {errorMessage}
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    className="form-control"
                    placeholder="Enter your new password"
                    style={{ color: "black" }}
                    onChange={handleNewPassword}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    placeholder="Confirm your new password"
                    style={{ color: "black" }}
                    onChange={handleConfirmPassword}
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleResetPassword}
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
