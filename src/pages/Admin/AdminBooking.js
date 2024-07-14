// components/AdminBookingList.js
import React, { useEffect, useState } from "react";
import { getBookingsAPI, deleteBookingAPI } from "../apis/Api";

const AdminBookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingsAPI();
        setBookings(response.data);
      } catch (error) {
        console.error(error);
        alert("Error fetching bookings");
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBookingAPI(id);
      alert("Booking deleted successfully");
      setBookings(bookings.filter((booking) => booking._id !== id));
    } catch (error) {
      console.error(error);
      alert("Error deleting booking");
    }
  };

  return (
    <div>
      <h2>All Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            <p>Full Name: {booking.fullName}</p>
            <p>Car Number: {booking.carNumber}</p>
            <p>Problem Description: {booking.problemDescription}</p>
            <p>Date: {booking.date}</p>
            <p>Contact Number: {booking.contactNumber}</p>
            <button onClick={() => handleDelete(booking._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBookingList;
