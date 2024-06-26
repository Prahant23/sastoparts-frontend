import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { checkoutOrder } from "../../apis/Api";

const CheckoutForm = () => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash"); // Default payment method

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        shippingInfo,
        paymentMethod
      };

      // Call the checkoutOrder function from the API
      const response = await checkoutOrder(data);

      // Check if the order was successfully placed
      if (response && response.message === 'Order placed successfully') {
        // Reset the form fields
        setShippingInfo({
          fullName: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          postalCode: "",
          country: "",
          phoneNumber: "",
          email: "",
        });
        setPaymentMethod("cash");

        // Show success message
        toast.success("Order placed successfully!");
      } else {
        // Show error message
        toast.error("Failed to place order. Please try again later.");
      }
    } catch (error) {
      // Handle any errors
      console.error("Error placing order:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <h2 className="mb-4">Checkout</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  value={shippingInfo.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="addressLine1" className="form-label">
                  Address Line 1
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="addressLine1"
                  name="addressLine1"
                  value={shippingInfo.addressLine1}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="addressLine2" className="form-label">
                  Address Line 2
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="addressLine2"
                  name="addressLine2"
                  value={shippingInfo.addressLine2}
                  onChange={handleChange}
                />
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="postalCode" className="form-label">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="postalCode"
                    name="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={shippingInfo.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="paymentMethod" className="form-label">
                  Payment Method
                </label>
                <select
                  className="form-select"
                  id="paymentMethod"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <option value="cash">Cash on Delivery</option>
                  <option value="card">Credit/Debit Card</option>
                  {/* Add more payment methods if needed */}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Place Order
              </button>
              <Link to="/cart" className="btn btn-link ms-2">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
