import React, { useEffect, useState } from "react";
import { getBookingsAPI, deleteBookingAPI } from "../apis/Api";
import "./BookingList.css";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

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

  // Function to format date as "Month Day" (e.g., "July 16th")
  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options);
    
    // Function to add ordinal suffix to day (e.g., 1st, 2nd, 3rd, ...)
    const day = date.getDate();
    const suffix = getOrdinalSuffix(day);
    
    return `${formattedDate}${suffix}`;
  };

  // Function to get ordinal suffix for day
  const getOrdinalSuffix = (day) => {
    if (day === 1 || day === 21 || day === 31) {
      return "st";
    } else if (day === 2 || day === 22) {
      return "nd";
    } else if (day === 3 || day === 23) {
      return "rd";
    } else {
      return "th";
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
              <td>{formatDate(booking.date)}</td> {/* Format date here */}
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
