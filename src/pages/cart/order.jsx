import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrderApi } from '../../apis/Api'; // Import only the necessary API
import 'bootstrap/dist/css/bootstrap.min.css';

const ReviewPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { shippingInfo, cartItems, totalPrice } = location.state || {};
    const user = JSON.parse(localStorage.getItem("user"));
    const userid = user?._id;

    const [cart, setCart] = useState(cartItems || []);
    const [shippingInfoState, setShippingInfo] = useState(shippingInfo || {});
    const [totalPayment, setTotalPayment] = useState(totalPrice || 0);
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
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

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-12 col-md-7" style={{ backgroundColor: '#1E2A3A', color: '#6FFFE9' }}>
                    <div className="card p-3" style={{ backgroundColor: '#1E2A3A', color: '#6FFFE9' }}>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    value={shippingInfo.firstName || ''}
                                    readOnly
                                    style={{ color: 'black' }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    value={shippingInfo.lastName || ''}
                                    readOnly
                                    style={{ color: 'black' }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    value={shippingInfo.address || ''}
                                    readOnly
                                    style={{ color: 'black' }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="contactNumber"
                                    name="contactNumber"
                                    value={shippingInfo.contactNumber || ''}
                                    readOnly
                                    style={{ color: 'black' }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pickUpDate" className="form-label">Pick-Up Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="pickUpDate"
                                    name="pickUpDate"
                                    value={shippingInfo.pickUpDate || ''}
                                    readOnly
                                    style={{ color: 'black' }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="returnDate" className="form-label">Return Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="returnDate"
                                    name="returnDate"
                                    value={shippingInfo.returnDate || ''}
                                    readOnly
                                    min={shippingInfo.pickUpDate ? new Date(new Date(shippingInfo.pickUpDate).setDate(new Date(shippingInfo.pickUpDate).getDate() + 1)).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                                    style={{ color: 'black' }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="specificRequirements" className="form-label">Specific Requirements</label>
                                <textarea
                                    className="form-control"
                                    id="specificRequirements"
                                    name="specificRequirements"
                                    rows="3"
                                    value={shippingInfo.specificRequirements || ''}
                                    readOnly
                                    style={{ color: 'black' }}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-12 col-md-5 mb-4" style={{ backgroundColor: '#1E2A3A', color: '#6FFFE9' }}>
                    <div className="card p-3" style={{ backgroundColor: '#1E2A3A', color: '#6FFFE9' }}>
                        <div className="cart-items">
                            {cart.length > 0 ? cart.map((item) => (
                                <div key={item._id} className="cart-item mb-3 d-flex align-items-center" style={{ color: '#6FFFE9' }}>
                                    <img src={item?.productImg} alt={item?.productName || 'Product'} className="cart-item-image" style={{ width: '225px', height: '225px' }} />
                                    <div className="cart-item-details ms-3">
                                        <div className="d-flex flex-column">
                                            <span className="cart-item-name">{item?.productName || 'Unknown Product'}</span>
                                            <div className="d-flex flex-column mt-2">
                                                <span className="cart-item-owner"><strong>Quantity: </strong>{item?.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : <div>No items in cart</div>}
                            <div className="mt-3">
                                <h4 className="text-white">Total Price: Rs. {totalPrice}</h4>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h2 className="text-primary mb-4">Payment Method</h2>
                            <form onSubmit={handlePlaceOrder}>
                                <div className="mb-3">
                                    <label className="form-check">
                                        <input type="radio" className="form-check-input" name="payment" value="cod" onChange={(e) => setPaymentMethod(e.target.value)} />
                                        <span className="form-check-label">Cash on Delivery</span>
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label className="form-check">
                                        <input type="radio" className="form-check-input" name="payment" value="card" onChange={(e) => setPaymentMethod(e.target.value)} />
                                        <span className="form-check-label">Credit/Debit Card</span>
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label className="form-check">
                                        <input type="radio" className="form-check-input" name="payment" value="upi" onChange={(e) => setPaymentMethod(e.target.value)} />
                                        <span className="form-check-label">UPI</span>
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label className="form-check">
                                        <input type="radio" className="form-check-input" name="payment" value="wallet" onChange={(e) => setPaymentMethod(e.target.value)} />
                                        <span className="form-check-label">Wallet</span>
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary">Place Order</button>
                            </form>
                            <button onClick={handlePrint} className="btn btn-secondary mt-5">Print Invoice</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;
