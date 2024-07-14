import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteCartProductApi } from "../../apis/Api";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.data;
      const itemsWithQuantity = data.cart.map((item) => ({
        ...item,
        quantity: 1,
      }));
      setCartItems(itemsWithQuantity);
      updateTotalItemsAndPrice(itemsWithQuantity);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTotalItemsAndPrice = (items) => {
    const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPriceCount = items.reduce(
      (acc, item) => acc + item.productPrice * item.quantity,
      0
    );
    setTotalItems(totalItemsCount);
    setTotalPrice(totalPriceCount);
  };

  const removeCartItem = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item from your cart?"
    );
    if (!confirm) {
      return;
    } else {
      deleteCartProductApi(id).then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          window.location.reload();
        }
      });
    }
  };

  const incrementQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity += 1;
    setCartItems(updatedCartItems);
    updateTotalItemsAndPrice(updatedCartItems);
  };

  const decrementQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity -= 1;
      setCartItems(updatedCartItems);
      updateTotalItemsAndPrice(updatedCartItems);
    }
  };

  const handleProceedToCheckout = () => {
    const productIds = cartItems.map(item => item._id).join(',');
    navigate('/checkout', { state: { productIds, totalPrice } });
  };

  return (
    <div className="py-5" style={{ backgroundColor: "#051923", color: "#6FFFE9" }}>
      <div className="">
        <div className="row mx-2">
          <h2 className="mb-4">Your Shopping Cart</h2>
          <div className="col-md-8">
            {cartItems.map((cart, index) => (
              <div key={index} className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={cart.productImg}
                      alt={cart.productName}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{cart.productName}</h5>
                      <p className="card-text mb-1">
                        <strong>Price:</strong> ${cart.productPrice}
                      </p>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => decrementQuantity(index)}
                        >
                          -
                        </button>
                        <span className="me-2">{cart.quantity}</span>
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => incrementQuantity(index)}
                        >
                          +
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeCartItem(cart._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Cart Summary</h2>
                <hr />
                <p className="mb-1">
                  Total Items:{" "}
                  <span className="badge bg-primary">{totalItems}</span>
                </p>
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
                <button
                  className="btn btn-primary btn-block"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
