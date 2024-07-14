// PlaceOrder.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './PlaceOrder.css'; // Import CSS for styling

const Order = () => {
  const [products, setProducts] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        products: products.split(',').map(productId => ({ productId, quantity: 1 })), // Assuming quantity is 1 per product
        totalAmount: parseFloat(totalAmount),
      };

      const token = localStorage.getItem('token'); // Get token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('/api/orders', orderData, config);
      setSuccessMessage(response.data.message);
      // Optionally, you can redirect or show a success message
    } catch (error) {
      setError('Error placing order. Please try again later.');
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">Place Order</h1>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      <form onSubmit={handlePlaceOrder}>
        <div className="input-field mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product IDs (comma separated)
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter product IDs"
            value={products}
            onChange={(e) => setProducts(e.target.value)}
            required
          />
        </div>
        <div className="input-field mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Total Amount</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Enter total amount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
          />
        </div>
        
        <button
          className="button"
          type="submit"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Order;
