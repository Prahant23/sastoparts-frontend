import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

const Admineditorder = () => {
    const [orders, setOrders] = useState([]);
    const userId = JSON.parse(localStorage.getItem("user"))?._id;
    const token = localStorage.getItem("token"); // Retrieve the token from local storage

    useEffect(() => {
        // Fetch order details using user ID
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`https://localhost:4000/api/createorder/`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the headers
                    },
                });
                if (response.data.success) {
                    setOrders(response.data.orders);
                } else {
                    console.error('Failed to fetch orders:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        if (userId && token) {
            fetchOrders();
        }
    }, [userId, token]);

    // Handler for approving an order
    const handleApprove = async (orderId) => {
        try {
            const response = await axios.put(
                `https://localhost:4000/api/createorder/updateOrderStatus/${orderId}`,
                { status: 'Approved' },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the headers
                    },
                }
            );
            if (response.data.success) {
                // Update the orders state to reflect the change
                setOrders(orders.map(order => 
                    order._id === orderId ? { ...order, orderStatus: 'Approved' } : order
                ));
            } else {
                console.error('Failed to approve order:', response.data.message);
            }
        } catch (error) {
            console.error('Error approving order:', error);
        }
    };

    // Handler for canceling an order
    const handleCancel = async (orderId) => {
        try {
            const response = await axios.delete(
                `https://localhost:4000/api/createorder/cancelOrder/${orderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the headers
                    },
                }
            );
            if (response.data.success) {
                // Update the orders state to reflect the change
                setOrders(orders.filter(order => order._id !== orderId));
            } else {
                console.error('Failed to cancel order:', response.data.message);
            }
        } catch (error) {
            console.error('Error canceling order:', error);
        }
    };

    return (
        <div className="container mt-5" style={{ backgroundColor: '#cbccd0', color: '#767986' }}>
            <h2 className="text-center mb-4">Orders History</h2>
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
                            <th>Actions</th> {/* Add a new column for actions */}
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
                                <td>
                                    {/* Add approve and cancel buttons */}
                                    <Button 
                                        variant="success" 
                                        onClick={() => handleApprove(order._id)}
                                        disabled={order.orderStatus === 'Approved' || order.orderStatus === 'Cancelled'}
                                    >
                                        Approve
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        onClick={() => handleCancel(order._id)}
                                        disabled={order.orderStatus === 'Approved' || order.orderStatus === 'Cancelled'}
                                        className="ml-2"
                                    >
                                        Cancel
                                    </Button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Admineditorder;
