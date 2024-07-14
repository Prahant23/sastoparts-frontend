import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getLoggedInUserDetail, updateLoggedInUserDetail } from "../apis/Api";
import { toast } from "react-toastify";
import "./editprofile.css";

const Profile = () => {
  const { id } = useParams(); // Access id parameter from URL
  const fileInputRef = useRef(null);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: null, // Assuming avatar is managed as a file
  });

  useEffect(() => {
    // Fetch user details on component mount
    if (id) {
      getLoggedInUserDetail(id)
        .then((res) => {
          if (res.data.success === false) {
            toast.error(res.data.message);
          } else {
            setUser(res.data.user);
          }
        })
        .catch((err) => {
          console.error("Error fetching user details:", err);
          toast.error("Internal server error");
        });
    }
  }, [id]); // Ensure useEffect runs when id changes

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUser((user) => ({ ...user, avatar: file }));
  };

  const handleUserUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("email", user.email);
      formData.append("avatar", user.avatar);

      const res = await updateLoggedInUserDetail(id, formData);
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user. Please try again later.");
    }
  };

  const placeholderAvatar =
    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h2>Your Profile</h2>
        <div className="profile-image" onClick={handleImageClick}>
          <img
            src={user.avatar || placeholderAvatar}
            alt="User Profile"
            onError={(e) => console.error("Image loading error", e)}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <div className="profile-details">
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="text"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <button className="save-btn" onClick={handleUserUpdate}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
