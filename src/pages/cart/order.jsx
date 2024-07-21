import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrderApi } from '../../apis/Api'; // Import only the necessary API
import ShippingForm from '../shippingForm';
import "../cart/PlaceOrder.css";

const ReviewPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { shippingInfo, cartItems, totalPrice } = location.state || {};
        const user = JSON.parse(localStorage.getItem("user"));
    const userid = user?._id;
    
    // Extract state from location
    
    const [cart, setCart] = useState(cartItems || []);
    const [shippingInfoState, setShippingInfo] = useState(shippingInfo || {});
    const [totalPayment, setTotalPayment] = useState(totalPrice || 0);
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        console.log("Cart Items:", cartItems);

        if (cartItems) {
            setTotalPayment(cartItems.reduce((acc, item) => acc + parseFloat(item.totalPrice || 0), 0).toFixed(2));
        }
    }, [cartItems]);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
    
        if (!shippingInfoState) {
            toast.error('No shipping information available');
            return;
        }
    
        const currentTime = new Date().toISOString();
        const cartItemList = cart.map(item => ({ cartID: item._id }));
    
        const orderData = {
            userID: userid,
            cartItems: cartItemList,
            shippingID: shippingInfoState._id,
            totalPayment,
            paymentMethod,
            orderStatus: 'pending',
            createdAt: currentTime,
        };
    
        try {
            const response = await createOrderApi(orderData);
            if (response.data.success === false) {
                toast.error(response.data.message);
            } else {
                toast.success(response.data.message);
                navigate('/success', { 
                    state: { 
                        orderData: response.data.order,
                        shippingInfo: shippingInfoState, 
                        totalPayment 
                    } 
                });
            }
        } catch (err) {
            toast.error('Error Placing Order');
        }
    };
    
    

    const handlePrint = () => {
        window.print();
    };

    const handleSaveShippingInfo = (info) => {
        setShippingInfo(info);
    };

    return (
        <div className="max-w-6xl mx-auto p-2 mt-24" style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#3d5a81' }}>
            <div style={{ display: 'flex', width: '90%', marginBottom: '2%', marginTop: '3%', backgroundColor: 'white', boxShadow: '0 0 10px rgba(0, 0, 0, 0.305)' }}>
                <div style={{ flex: '2', marginLeft: '3%' }}>
                    <div className="cart-items" style={{ marginLeft: '4%', marginTop: '5%' }}>
                        {cart.length > 0 ? cart.map((item) => (
                            <div key={item._id} className="cart-item" style={{ marginBottom: '2rem', height: '100px' }}>
                                <img src={item?.productImg} alt={item?.productName || 'Product'} className="cart-item-image" />
                                <div className="cart-item-details" style={{ marginLeft: '2rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span className="cart-item-name">{item?.productName || 'Unknown Product'}</span>
                                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '0.5rem' }}>
                                            <span className="cart-item-owner"><strong>Quantity: </strong>{item?.quantity}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
                                        <span className="total-price" style={{ fontSize: '23px' }}>Rs. {totalPrice} </span>
                                    </div>
                                </div>
                            </div>
                        )) : <div>No items in cart</div>}
                    </div>
                    <div style={{ width: '90%', marginLeft: '5%', marginTop: '5%' }}>
                        <div className="bg-white shadow-md rounded-lg">
                            <h2 className="text-xl text-blue-500 mb-4" style={{ marginTop: '2%', fontWeight: 'normal', color:'#1c9bc9' }}>Payment Method</h2>
                            <form onSubmit={handlePlaceOrder}>
                                <div className="mb-4">
                                    <label className="inline-flex items-center">
                                        <input type="radio" className="form-radio text-blue-500" name="payment" value="cod" onChange={(e) => setPaymentMethod(e.target.value)} />
                                        <span className="ml-2">Cash on Delivery</span>
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label className="inline-flex items-center">
                                        <input type="radio" className="form-radio text-blue-500" name="payment" value="card" onChange={(e) => setPaymentMethod(e.target.value)} />
                                        <span className="ml-2">Credit/Debit Card</span>
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label className="inline-flex items-center">
                                        <input type="radio" className="form-radio text-blue-500" name="payment" value="upi" onChange={(e) => setPaymentMethod(e.target.value)} />
                                        <span className="ml-2">UPI</span>
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label className="inline-flex items-center">
                                        <input type="radio" className="form-radio text-blue-500" name="payment" value="wallet" onChange={(e) => setPaymentMethod(e.target.value)} />
                                        <span className="ml-2">Wallet</span>
                                    </label>
                                </div>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Place Order</button>
                                </form>
                            <button onClick={handlePrint} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Print Invoice</button>
                        </div>
                    </div>
                </div>
                <div style={{ flex: '1', marginRight: '3%' }}>
                <form >
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={shippingInfo.firstName}
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
          />
        </div>
      </form>
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;
