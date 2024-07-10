// components/BookingList.js
import React, { useEffect, useState } from "react";
import { getBookingsAPI } from "../apis/Api";

const BookingList = () => {
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

  return (
    <div>
      <h2>Bookings List</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            <p>Full Name: {booking.fullName}</p>
            <p>Car Number: {booking.carNumber}</p>
            <p>Problem Description: {booking.problemDescription}</p>
            <p>Date: {booking.date}</p>
            <p>Contact Number: {booking.contactNumber}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
