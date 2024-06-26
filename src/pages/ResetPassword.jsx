import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPasswordApi } from "../apis/Api";
 
const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
 
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
 
  const handleResetPassword = () => {
    const data = {
      password: newPassword,
    };
 
    resetPasswordApi(data, token)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/");
        } else {
          toast.error("Failed to update password");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal server error");
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