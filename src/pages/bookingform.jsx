import React, { useState } from "react";
import { createBookingAPI } from "../apis/Api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    carNumber: "",
    problemDescription: "",
    date: "",
    contactNumber: "",
  });

  const [newBooking, setNewBooking] = useState(null); // State to hold the new booking data

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createBookingAPI(formData);
      const createdBooking = response.data; // Assuming API returns the newly created booking
      setNewBooking(createdBooking); // Update state with new booking data
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
        <p style={{color: "#C4C4C4"}}>At Sastoaparts, we're dedicated to providing top-notch automotive care,<br /> where your satisfaction drives every repair and service we offer.</p>
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
                min={getTodayDate()} // Set min attribute to today's date
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
        <button type="submit" className="btn mt-3" style={{ backgroundColor: "#6FFFE9" }}>Book Garage</button>
      </form>

      {/* Display newly created booking details */}
      {newBooking && (
        <div className="mt-4">
          <h3>Your Booking Details:</h3>
          <p><strong>Full Name:Prashant Bist</strong> {newBooking.fullName}</p>
          <p><strong>Car Number: 33333</strong> {newBooking.carNumber}</p>
          <p><strong>Problem Description:engine is making noise</strong> {newBooking.problemDescription}</p>
          <p><strong>Date:16th july</strong> {newBooking.date}</p>
          <p><strong>Contact Number:9999999999</strong> {newBooking.contactNumber}</p>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
