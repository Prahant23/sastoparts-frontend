import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changePasswordApi } from "../apis/Api";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "jquery";
import "./changePassword.css"; // Make sure to create this CSS file

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');

  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!oldPassword) {
      setOldPasswordError("Old password is required.");
      isValid = false;
    } else {
      setOldPasswordError("");
    }

    if (!newPassword) {
      setNewPasswordError("New password is required.");
      isValid = false;
    } else {
      setNewPasswordError("");
    }

    if (!isValid) return;

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user._id) {
      toast.error("User not authenticated. Please log in again.");
      return;
    }
    const userId = user._id;

    try {
      const response = await changePasswordApi(userId, { oldPassword, newPassword });

      if (response.data.success) {
        toast.success("Password changed successfully!");
        setOldPassword('');
        setNewPassword('');
        navigate('/'); // Redirect to homepage
      } else {
        toast.error(response.data.message || "Failed to change password.");
      }
    } catch (error) {
      toast.error("An error occurred while changing the password.");
    }
  };

  return (
    <div className="container-fluid h-100 d-flex align-items-center justify-content-center background-image">
      <div className="col-md-6 col-lg-4">
        <div className="text-center">
          <img id="profile-img" className="rounded-circle profile-img-card mb-4" src="https://i.imgur.com/6b6psnA.png" alt="Profile" style={{ height: "180px" }} />
          <form className="form-signin bg-white p-4 rounded shadow" onSubmit={handleChangePassword}>
            <h1 className="h3 mb-3 font-weight-normal">Change Password</h1>
            <div className="form-group">
              <label htmlFor="oldPassword" className="sr-only">Old Password</label>
              <input
                type="password"
                id="oldPassword"
                className="form-control"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                autoFocus
              />
              {oldPasswordError && (
                <div className="text-danger text-sm mt-1">{oldPasswordError}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="newPassword" className="sr-only">New Password</label>
              <input
                type="password"
                id="newPassword"
                className="form-control"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              {newPasswordError && (
                <div className="text-danger text-sm mt-1">{newPasswordError}</div>
              )}
            </div>
            <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Enter</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
