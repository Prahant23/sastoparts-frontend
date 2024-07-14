import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Homepage.css"; // Ensure this is your custom CSS file
import bike from "../assets/images/Container.png";

function Homepage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToCart = async (product) => {
    try {
      await axios.post(
        "http://localhost:4000/api/cart/addtocart",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          "http://localhost:4000/api/product/getProduct"
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
        <img src={bike} alt="Bike" style={{ width: "80%" }} />
      </div>

      <div className="">
        <div className=" py-5">
          <div className="text-center ">
            <div className="d-flex justify-content-evenly">
              <div className="mx-5 d-flex gap-2">
                <div className="p-2 h-fill">                <i className="fas fa-shipping-fast fa-2x mb-3"></i>
                </div>
                <div>
                  <div className="text-start">
                  <h4 style={{color:"#6FFFE9"}}>Free Home Delivery</h4>
                  <p>Provide free home delivery for all<br/>
                  product over Rs10000</p>

                  </div>

                </div>
              </div>
              <div className="mx-5 d-flex gap-2">
              <div className="p-2 h-fill">  
                <i className="fas fa-check-circle fa-2x mb-3"></i></div>
                <div className="text-start">
                  <h4 style={{color:"#6FFFE9"}}>Quality Products</h4>
                  <p>We ensure our product quality <br/>all
                  times</p>

                  </div>
              </div>
              <div className="mx-5 d-flex gap-2">
                <div className="p-2 h-fill">
                <i className="fas fa-phone fa-2x mb-3"></i>

                </div>
                <div className="text-start">
                  <h4 style={{color:"#6FFFE9"}}>Booking</h4>
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
          <h2 className="mb-3">Best selling product</h2>
        </div>
        <div className="col-12">
          <div className="row">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-6 col-sm-12 col-6 gap-2"
              >
                <div className="product-card mx-2">
                  <div className="product-image">
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="h-fit"
                      style={{ height: "250px", width: "220px" }}
                    />
                  </div>
                  <div className="product-info">
                    <h5>{product.productName}</h5>
                    <p>${product.productPrice}</p>
                    <div className="product-actions">
                      <button
                        className="btn btn-primary"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleModalOpen(product)}
                      >
                        Quick View
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
          <h2 className="mb-3">All of Our Products</h2>
        </div>
        <div className="col-12">
          <div className="row">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-6 col-sm-12 col-6 gap-2"
              >
                <div className="product-card mx-2">
                  <div className="product-image">
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="h-fit"
                      style={{ height: "250px", width: "220px" }}
                    />
                  </div>
                  <div className="product-info">
                    <h5>{product.productName}</h5>
                    <p>${product.productPrice}</p>
                    <div className="product-actions">
                      <button
                        className="btn btn-primary"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleModalOpen(product)}
                      >
                        Quick View
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
                    <p className="h5">Price: ${selectedProduct.productPrice}</p>
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
