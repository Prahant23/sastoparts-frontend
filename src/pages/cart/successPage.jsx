import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const SuccessPage = () => {
    const [orders, setOrders] = useState([]);
    const [shippingInfo, setShippingInfo] = useState({});
    const [totalPayment, setTotalPayment] = useState(0);

    const userId = JSON.parse(localStorage.getItem("user"))?._id;

    useEffect(() => {
        // Fetch order details using user ID
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/createorder/user/${userId}`);
                if (response.data.success) {
                    setOrders(response.data.orders);
                    // Assuming shippingInfo and totalPayment are constant, set these accordingly if needed
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [userId]);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Order Success</h2>
            <h4 className="text-center">Thank you for your purchase!</h4>
            <div className="order-details mt-4">
                <h5>Order Details:</h5>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Total Payment</th>
                            <th>Payment Method</th>
                            <th>Order Status</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>Rs. {order.totalPayment}</td>
                                <td>{order.paymentMethod}</td>
                                <td>{order.orderStatus}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <h5>Shipping Information:</h5>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Contact Number</th>
                            <th>City</th>
                            <th>ZIP Code</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{shippingInfo?.firstName || 'N/A'}</td>
                            <td>{shippingInfo?.lastName || 'N/A'}</td>
                            <td>{shippingInfo?.address || 'N/A'}</td>
                            <td>{shippingInfo?.contactNumber || 'N/A'}</td>
                            <td>{shippingInfo?.city || 'N/A'}</td>
                            <td>{shippingInfo?.zip || 'N/A'}</td>
                            <td>{shippingInfo?.state || 'N/A'}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default SuccessPage;
