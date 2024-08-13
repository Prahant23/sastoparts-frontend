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
import Profile from "./pages/eidtprofile"; // Check spelling: "editprofile"?
import CheckoutForm from "./pages/cart/order";
import Footer from "./components/Footer";
import BookingForm from "./pages/bookingform";
import BookingList from "./components/bookingList";
import ChangePassword from "./pages/changepassword";
import Order from "./pages/cart/order";
import FAQs from "./pages/FAQs";
import ShippingForm from "./pages/shippingForm";
import SuccessPage from "./pages/cart/successPage";
import AdminOrdersPage from "./pages/Admin/AdminOrder";
import VerifyEmail from "./pages/verifyemail";


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
        <Route path="/checkout" element={<Order />} />
        <Route path="/edit-profile/:id" element={<Profile />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/book-garage" element={<BookingForm />} />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/changepassword/:id" element={<ChangePassword />} />
        <Route path="/FAQs" element={<FAQs/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/shipping" element={<ShippingForm/>} />
        <Route path="/success" element={<SuccessPage/>} />
        <Route path="/manageorder" element={<AdminOrdersPage/>} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        
        {/* Protect routes with User authentication */}
        <Route element={<UserRoutes />}>
          {/* <Route path="/profile" element={<>} /> */}
        </Route>
        
        {/* Protect routes with Admin authentication */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/edit-product/:id" element={<AdminEditProducts />} />
        </Route>
        
        {/* Handle 404 errors */}
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
