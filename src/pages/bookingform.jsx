import React, { useState, useEffect } from "react";
import { createBookingAPI, getUserBookingsAPI, deleteBookingAPI } from "../apis/Api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BookingForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    carNumber: "",
    problemDescription: "",
    date: "",
    contactNumber: "",
  });

  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchUserBookings(userId);
    }
  }, [userId]);

  const fetchUserBookings = async (userId) => {
    try {
      const response = await getUserBookingsAPI(userId);
      if (response.data) {
        setUserBookings(response.data);
      } else {
        toast.error("No data returned from API");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching user bookings");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBookingAPI(id);
      toast.success("Booking deleted successfully");
      fetchUserBookings(userId); // Refresh bookings after delete
    } catch (error) {
      console.error(error);
      toast.error("Error deleting booking");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation rules
    if (name === "fullName" && !/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }
    if (name === "carNumber" && !/^[a-zA-Z0-9]*$/.test(value)) {
      return;
    }
    if (name === "contactNumber" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBookingAPI(formData);
      fetchUserBookings(userId); // Fetch user bookings after successful creation
      toast.success("Booking created successfully");
      setFormData({
        fullName: "",
        carNumber: "",
        problemDescription: "",
        date: "",
        contactNumber: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error creating booking");
    }
  };

  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <div style={{ backgroundColor: "#051923", color: "#6FFFE9", padding: "20px" }}>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="container" style={{ backgroundColor: "#051923", color: "#6FFFE9" }}>
        <p style={{ color: "#C4C4C4" }}>
          At Sastoaparts, we're dedicated to providing top-notch automotive care,
          <br />
          where your satisfaction drives every repair and service we offer.
        </p>
        <h2>Book A Garage</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Car Number:</label>
              <input
                type="text"
                name="carNumber"
                value={formData.carNumber}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Problem Description:</label>
              <textarea
                name="problemDescription"
                value={formData.problemDescription}
                onChange={handleChange}
                className="form-control"
                required
              ></textarea>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-control"
                min={getTodayDate()}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Contact Number:</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn mt-3" style={{ backgroundColor: "#6FFFE9" }}>
          Book Garage
        </button>
      </form>

      {/* Display user's bookings */}
      <div className="mt-4">
        <h2>Your Bookings</h2>
        <ul>
          {userBookings.map((booking) => (
            <li key={booking._id}>
              <p>Full Name: {booking.fullName}</p>
              <p>Car Number: {booking.carNumber}</p>
              <p>Problem Description: {booking.problemDescription}</p>
              <p>Date: {booking.date}</p>
              <p>Contact Number: {booking.contactNumber}</p>
              <button onClick={() => handleDelete(booking._id)} className="btn btn-danger">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookingForm;
