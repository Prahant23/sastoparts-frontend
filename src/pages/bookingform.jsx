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
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBookingAPI(formData);
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
 
  return (
    <div style={{ backgroundColor: "#051923", color: "#6FFFE9", padding: "20px" }}>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="container" style={{ backgroundColor: "#051923", color: "#6FFFE9" }}>
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
    </div>
  );
};
 
export default BookingForm;