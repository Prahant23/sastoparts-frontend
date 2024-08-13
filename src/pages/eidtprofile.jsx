import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateUserApi, uploadAvatarApi } from "../apis/Api";
import { useNavigate } from "react-router-dom";
import "../pages/editprofile.css"; // Assuming this file contains your custom styles

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    contactNumber: user.contactNumber || '',
    address: user.address || '',
    avatar: user.avatar || '',
  });

  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    address: ''
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        firstName: storedUser.firstName,
        lastName: storedUser.lastName,
        email: storedUser.email,
        contactNumber: storedUser.contactNumber,
        address: storedUser.address,
        avatar: storedUser.avatar,
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'contactNumber' && !/^\d*$/.test(value)) {
      return;
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let errorMessage = '';

    switch (fieldName) {
      case 'firstName':
        errorMessage = value.trim() ? '' : 'First Name is required';
        break;
      case 'lastName':
        errorMessage = value.trim() ? '' : 'Last Name is required';
        break;
      case 'contactNumber':
        errorMessage = /^\d{10}$/.test(value) ? '' : 'Contact Number must be 10 digits';
        break;
      case 'address':
        errorMessage = value.trim() ? '' : 'Address is required';
        break;
      default:
        break;
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));

    return errorMessage === '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = Object.keys(errors).every(field => validateField(field, formData[field]));

    if (!isFormValid) {
      toast.error('Please fill in all required fields correctly.');
      return;
    }

    try {
      if (!user._id) {
        throw new Error('User ID is missing.');
      }

      const response = await updateUserApi(user._id, formData);
      console.log('Profile updated successfully:', response.data);
      toast.success('Profile updated successfully');
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error.message);
      toast.error('Error updating profile');
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        if (!user._id) {
          throw new Error('User ID is missing.');
        }

        const response = await uploadAvatarApi(user._id, formData);
        setFormData(prevFormData => ({
          ...prevFormData,
          avatar: response.data.avatar
        }));
        setUser(prevUser => ({
          ...prevUser,
          avatar: response.data.avatar
        }));
        localStorage.setItem('user', JSON.stringify({ ...user, avatar: response.data.avatar }));
      } catch (error) {
        console.error('Error uploading avatar:', error.message);
        toast.error('Error uploading avatar');
      }
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  useEffect(() => {
    if (!user._id) {
      navigate('/login');
    }
  }, [user._id, navigate]);

  return (
    <div className="container-fluid col-xxl-8 px-4 py-5 profilepage">
      <div className="background-img2 d-flex justify-content-center">
        <div className="profile-card">
          <h1 className="profile-header">My Profile</h1>

          <div className="profile-content">
            <div className="left-content">
              <label htmlFor="avatarInput" className="profile-photo">
                <img
                  src={formData.avatar || `https://via.placeholder.com/150?text=${getInitials(formData.firstName, formData.lastName)}`}
                  alt="Profile"
                  className="profile-photo-image"
                />
              </label>
              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarUpload}
              />
              <div className="user-info">
                <h2 className="user-name">
                  {formData.firstName} {formData.lastName}
                </h2>
              </div>
              {!editMode && (
                <button
                  className="btn edit-button"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
              )}
            </div>

            <div className="right-content">
              {!editMode ? (
                <div className="profile-form">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" value={formData.firstName} readOnly className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" value={formData.lastName} readOnly className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input type="text" value={formData.contactNumber} readOnly className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" value={formData.address} readOnly className="form-control" />
                  </div>
                </div>
              ) : (
                <form className="profile-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`form-control ${errors.firstName ? 'input-error' : ''}`}
                    />
                    {errors.firstName && <span className='error-message'>{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`form-control ${errors.lastName ? 'input-error' : ''}`}
                    />
                    {errors.lastName && <span className='error-message'>{errors.lastName}</span>}
                  </div>
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className={`form-control ${errors.contactNumber ? 'input-error' : ''}`}
                    />
                    {errors.contactNumber && <span className='error-message'>{errors.contactNumber}</span>}
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`form-control ${errors.address ? 'input-error' : ''}`}
                    />
                    {errors.address && <span className='error-message'>{errors.address}</span>}
                  </div>

                  <div className="btn-group">
                    <button type="submit" className="btn save-button">
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn cancel-button"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="account-info">
                <p className="info-item">
                  {formData.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
