// ShippingForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createShippingAddressAPI, getLoggedInUserDetail } from '../apis/Api'; // Adjust the import path

const ShippingForm = ({ userId, shippingInfo: initialShippingInfo, onSave }) => {
  const [shippingInfo, setShippingInfo] = useState(initialShippingInfo || {
    firstName: '',
    lastName: '',
    address: '',
    contactNumber: '',
    pickUpDate: '',
    returnDate: '',
    specificRequirements: ''
  });
  const navigate = useNavigate();  
  const location = useLocation();  
  const { cartItems, totalPrice } = location.state || {};


  useEffect(() => {
    const fetchUserInfo = async () => {
        try {
          const user = JSON.parse(localStorage.getItem("user"));
          if (user && user._id) {
            const response = await getLoggedInUserDetail(user._id);
            const userData = response.data.user;
            if (userData) {
              setShippingInfo({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                address: userData.address || '',
                contactNumber: userData.contactNumber || '',
                pickUpDate: '',
                returnDate: '',
                specificRequirements: ''
              });
            } else {
              toast.error('No user data found');
            }
          } else {
            toast.error('User not found in localStorage');
          }
        } catch (error) {
          toast.error("Error fetching user data");
          console.error("Error fetching user data:", error.message);
        
    }};

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setShippingInfo(prevState => {
      const updatedState = {
        ...prevState,
        [name]: value
      };

      if (name === 'pickUpDate') {
        const minReturnDate = new Date(value);
        minReturnDate.setDate(minReturnDate.getDate() + 1);
        const minReturnDateStr = minReturnDate.toISOString().split('T')[0];

        if (updatedState.returnDate && new Date(updatedState.returnDate) <= new Date(value)) {
          updatedState.returnDate = '';
          toast.error('Return date must be after pick-up date');
        }
        document.getElementById('returnDate').setAttribute('min', minReturnDateStr);
      }

      return updatedState;
    });

    if (onSave) {
      onSave({ ...shippingInfo, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(shippingInfo).some(field => !field)) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = { ...shippingInfo, userID: user._id };
      const response = await createShippingAddressAPI(data);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/order', {
          state: {
            shippingInfo,
            cartItems,
            totalPrice
          }
        })
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error creating shipping address");
      console.error("Error creating shipping address:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2>Shipping Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={shippingInfo.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={shippingInfo.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={shippingInfo.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contactNumber" className="form-label">Contact Number</label>
          <input
            type="text"
            className="form-control"
            id="contactNumber"
            name="contactNumber"
            value={shippingInfo.contactNumber}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pickUpDate" className="form-label">Pick-Up Date</label>
          <input
            type="date"
            className="form-control"
            id="pickUpDate"
            name="pickUpDate"
            value={shippingInfo.pickUpDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]} // Prevent past dates
          />
        </div>
        <div className="mb-3">
          <label htmlFor="returnDate" className="form-label">Return Date</label>
          <input
            type="date"
            className="form-control"
            id="returnDate"
            name="returnDate"
            value={shippingInfo.returnDate}
            onChange={handleChange}
            min={shippingInfo.pickUpDate ? new Date(new Date(shippingInfo.pickUpDate).setDate(new Date(shippingInfo.pickUpDate).getDate() + 1)).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]} // Prevent past dates and dates before pick-up date
          />
        </div>
        <div className="mb-3">
          <label htmlFor="specificRequirements" className="form-label">Specific Requirements</label>
          <textarea
            className="form-control"
            id="specificRequirements"
            name="specificRequirements"
            rows="3"
            value={shippingInfo.specificRequirements}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default ShippingForm;
