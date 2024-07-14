import React, { useEffect, useState } from "react";
import { getBookingsAPI, deleteBookingAPI } from "../apis/Api"; // Import deleteBookingAPI
import "./BookingList.css";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []); // Dependency array ensures useEffect runs once on component mount

  const fetchBookings = async () => {
    try {
      const response = await getBookingsAPI();
      setBookings(response.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching bookings");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBookingAPI(id);
      setBookings(bookings.filter((booking) => booking._id !== id));
      alert("Booking deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Error deleting booking");
    }
  };

  return (
    <div className="booking-list-container">
      <h2>Bookings List</h2>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Car Number</th>
            <th>Problem Description</th>
            <th>Date</th>
            <th>Contact Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.fullName}</td>
              <td>{booking.carNumber}</td>
              <td>{booking.problemDescription}</td>
              <td>{booking.date}</td>
              <td>{booking.contactNumber}</td>
              <td>
                <button onClick={() => handleDelete(booking._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
