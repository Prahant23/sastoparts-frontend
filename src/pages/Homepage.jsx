import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Homepage.css"; // Ensure this is your custom CSS file
import car from "../assets/images/car.png";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faEye, faList } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useNavigate();

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first to add items to the cart");
      history("/login"); // Redirect to login page
      return;
    }

    try {
      await axios.post(
        "https://localhost:4000/api/cart/addtocart",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Item added to cart");
    } catch (error) {
      toast.error("Failed adding to cart");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://localhost:4000/api/product/getProducts"
        );
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleModalOpen = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="homepage-container">
      <div className="d-flex justify-content-center">
        <img src={car} alt="car" style={{ width: "100%", height: "700px" }} />
      </div>

      <div className="text-black">
        <div className=" py-5">
          <div className="text-center ">
            <div className="d-flex justify-content-evenly">
              <div className="mx-5 d-flex gap-2">
                <div className="p-2 h-fill">
                  <i className="fas fa-shipping-fast fa-2x mb-3"></i>
                </div>
                <div>
                  <div className="text-start">
                    <h4 style={{color:"#030304"}}>Free Home Delivery</h4>
                    <p>Provide free home delivery for all<br/>
                    product over Rs10000</p>
                  </div>
                </div>
              </div>
              <div className="mx-5 d-flex gap-2 text-black">
                <div className="p-2 h-fill">  
                  <i className="fas fa-check-circle fa-2x mb-3"></i>
                </div>
                <div className="text-start text-black">
                  <h4 style={{color:"#030304"}}>Quality Products</h4>
                  <p>We ensure our product quality <br/>all
                  times</p>
                </div>
              </div>
              <div className="mx-5 d-flex gap-2">
                <div className="p-2 h-fill">
                  <i className="fas fa-phone fa-2x mb-3"></i>
                </div>
                <div className="text-start">
                  <h4 style={{color:"#030304"}}>Booking</h4>
                  <p>To satisfy our customer we try to<br/> give
                  support online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="searchbar">
        <input
          className="search_input"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products..."
        />
        <a href="#" className="search_icon">
          <i className="fas fa-search"></i>
        </a>
      </div>

      <div className=" product-section">
        <div className="text-center">
          <h2 className="mb-3" style={{color:"#030304"}}>Best selling product</h2>
          <p style={{color :" #030304"}}>All best seller product are now available for you and your can buy this product <br />
          from here any time any where so shop now</p>
        </div>
        <div className="col-12">
          <div className="row">
            {filteredProducts.map((product, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-sm-12 col-6 gap-2">
                <div className="product-card mx-2">
                  <div className="product-image">
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="h-fit"
                      style={{ height: '250px', width: '220px' }}
                    />
                  </div>
                  <div className="product-info">
                    <h5>{product.productName}</h5>
                    <p>Rs{product.productPrice}</p>
                    {/* Add Rating component with Bootstrap classes */}
                    <Rating
                      start={0}
                      stop={5}
                      step={1}
                      fractions={2}
                      initialRating={product.rating} // Replace with actual rating value from your data
                      readonly={true} // Make it read-only if displaying average rating
                      emptySymbol={<i className="far fa-star text-muted"></i>} // Bootstrap text-muted class for empty stars
                      fullSymbol={<i className="fas fa-star text-warning"></i>} // Bootstrap text-warning class for filled stars
                    />
                    <div className="product-actions">
                      <button
                        className="btn btn-primary add-to-cart-icon"
                        onClick={() => addToCart(product)}
                      >
                        <FontAwesomeIcon icon={faShoppingCart} />
                      </button>
                      <button
                        className="btn btn-secondary quick-view-icon"
                        onClick={() => handleModalOpen(product)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=" product-section">
        <div className="text-center">
          <h2 className="mb-3" style={{color:"#030304"}}>All of Our Products</h2>
        </div>
        <div className="col-12">
          <div className="row">
            {filteredProducts.map((product, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-sm-12 col-6 gap-2">
                <div className="product-card mx-2">
                  <div className="product-image">
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      
                      className="h-fit"
                      style={{ height: '250px', width: '220px' }}
                    />
                  </div>
                  <div className="product-info">
                    <h5>{product.productName}</h5>
                    <p>Rs{product.productPrice}</p>
                    {/* Add Rating component with Bootstrap classes */}
                    <Rating
                      start={0}
                      stop={5}
                      step={1}
                      fractions={2}
                      initialRating={product.rating} // Replace with actual rating value from your data
                      readonly={true} // Make it read-only if displaying average rating
                      emptySymbol={<i className="far fa-star text-muted"></i>} // Bootstrap text-muted class for empty stars
                      fullSymbol={<i className="fas fa-star text-warning"></i>} // Bootstrap text-warning class for filled stars
                    />
                    <div className="product-actions">
                      <button
                        className="btn btn-primary add-to-cart-icon"
                        onClick={() => addToCart(product)}
                      >
                        <FontAwesomeIcon icon={faShoppingCart} />
                      </button>
                      <button
                        className="btn btn-secondary quick-view-icon"
                        onClick={() => handleModalOpen(product)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <div
        className={`modal fade ${isModalOpen ? "show" : ""}`}
        style={{ display: isModalOpen ? "block" : "none" }}
        tabIndex="-1"
        aria-labelledby="quickViewModalLabel"
        aria-hidden={!isModalOpen}
      >
        {selectedProduct && (
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="quickViewModalLabel">
                  {selectedProduct.productName}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleModalClose}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <img
                      src={selectedProduct.productImage}
                      alt={selectedProduct.productName}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6">
                    <h4 className="mt-3">{selectedProduct.productName}</h4>
                    <p>{selectedProduct.productDescription}</p>
                    <p className="h5">Price: Rs{selectedProduct.productPrice}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleModalClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    addToCart(selectedProduct);
                    handleModalClose();
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
