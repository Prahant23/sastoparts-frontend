// components/BookingForm.js
import React, { useState } from "react";
import { createBookingAPI } from "../apis/Api";

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
      alert("Booking created successfully");
      setFormData({
        fullName: "",
        carNumber: "",
        problemDescription: "",
        date: "",
        contactNumber: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error creating booking");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Car Number:</label>
        <input
          type="text"
          name="carNumber"
          value={formData.carNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Problem Description:</label>
        <textarea
          name="problemDescription"
          value={formData.problemDescription}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Book Garage</button>
    </form>
  );
};

export default BookingForm;
