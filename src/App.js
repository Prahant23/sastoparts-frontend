import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import AdminRoutes from "./protected_routes/AdminRoutes";
import UserRoutes from "./protected_routes/UserRoutes";
import AdminEditProducts from "./pages/Admin/AdminEditProduct";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Cart from "./pages/cart/cart";
import Profile from "./pages/eidtprofile";
import CheckoutForm from "./pages/cart/order";
import Footer from "./components/Footer"
import BookingForm from "./pages/bookingform";
import BookingList from "./components/bookingList";
import ChangePassword from "./pages/changepassword";


function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cartpage" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/edit-profile/:id" element={<Profile />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/book-garage" element={<BookingForm />} />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/changepassword/:id" element={<ChangePassword />} />
        <Route element={<UserRoutes />}>
          {/* <Route path="/profile" element={<>} /> */}
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/edit-product/:id" element={<AdminEditProducts />} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
