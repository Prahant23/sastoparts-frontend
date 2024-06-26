import React, { useEffect, useState } from "react";
import { getAllProductsAPI } from "../apis/Api";
import axios from "axios";
import { toast } from "react-toastify";
import "./Homepage.css";
import Autosuggest from "react-autosuggest";

function Homepage() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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
          "http://localhost:5000/api/product/getProduct"
        );
        const data = await response.json();
        setProducts([data.products]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    getAllProductsAPI().then((res) => {
      setProducts(res.data.products);
    });
  }, []);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
  product.productName
    ?.toLowerCase()
    .includes((searchTerm || "").toLowerCase())
);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : products.filter((product) =>
          product.productName.toLowerCase().includes(inputValue)
        );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.productName;

  const renderSuggestion = (suggestion) => <div>{suggestion.productName}</div>;

  const onSuggestionSelected = (event, { suggestion }) => {
    // Redirect or display the selected product
    console.log("Selected product:", suggestion);
  };

  const inputProps = {
    placeholder: "Search products...",
    value: searchTerm,
    onChange: handleSearchChange,
  };

  return (
    <>
        <div className="container-fluid py-5 mb-5 hero-header">
          <div className="container py-5">
            <div className="row g-5 align-items-center">
              <div className="col-md-12 col-lg-7">
                <h4 className="mb-3 text-secondary">100% Authentic</h4>
                <h1 className="mb-5 display-3 text-primary">
                  vintage clothes and accessories
                </h1>
              </div>
              <div className="col-md-12 col-lg-5">
                <div
                  id="carouselId"
                  className="carousel slide position-relative"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active rounded">
                      <img
                        src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600"
                        className="img-fluid w-100 h-100 bg-secondary rounded"
                        alt="First slide"
                      />
                      <a href="#" className="btn px-4 py-2 text-white rounded">
                        Fruits
                      </a>
                    </div>
                    <div className="carousel-item rounded">
                      <img
                        src="https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg?auto=compress&cs=tinysrgb&w=600"
                        className="img-fluid w-100 h-80 rounded"
                        alt="Second slide"
                      />
                      <a href="#" className="btn px-4 py-2 text-white rounded">
                        Clothes
                      </a>
                    </div>
                    {/* Add more carousel items with local image paths */}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselId"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselId"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
        <div className="search-container">
        <Autosuggest
  suggestions={filteredProducts}
  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
  onSuggestionsClearRequested={onSuggestionsClearRequested}
  getSuggestionValue={(suggestion) => suggestion.productName} // Update to return product name
  renderSuggestion={renderSuggestion}
  inputProps={{
    placeholder: 'Search products...',
    value: searchTerm || '',
    onChange: (event, { newValue }) => setSearchTerm(newValue)
  }}
  onSuggestionSelected={(event, { suggestion }) => setSearchTerm(suggestion.productName)} // Update search term when suggestion is selected
/>

        </div>
        <div className="container-fluid fruite py-5">
          <div className="container py-5">
            <div className="tab-className text-center">
              <div className="row g-4">
                <div className="col-lg-4 text-start">
                  <h1>Our Authentic Products</h1>
                </div>
                <div className="col-lg-8 text-end">
                  <ul className="nav nav-pills d-inline-flex text-center mb-5">
                    <li className="nav-item">
                      <a
                        className="d-flex m-2 py-2 bg-light rounded-pill active"
                        data-bs-toggle="pill"
                        href="#tab-1"
                      >
                        <span className="text-dark" style={{ width: "130px" }}>
                          All Products
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="d-flex py-2 m-2 bg-light rounded-pill"
                        data-bs-toggle="pill"
                        href="#tab-2"
                      >
                        <span className="text-dark" style={{ width: "130px" }}>
                          Clothes
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="d-flex m-2 py-2 bg-light rounded-pill"
                        data-bs-toggle="pill"
                        href="#tab-3"
                      >
                        <span className="text-dark" style={{ width: "130px" }}>
                          Shoes
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="d-flex m-2 py-2 bg-light rounded-pill"
                        data-bs-toggle="pill"
                        href="#tab-4"
                      >
                        <span className="text-dark" style={{ width: "130px" }}>
                          Accessories
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="d-flex m-2 py-2 bg-light rounded-pill"
                        data-bs-toggle="pill"
                        href="#tab-5"
                      ></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {products.map((product, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="card">
                  <img
                    src={product.productImage}
                    className="card-img-top"
                    alt={product.productName}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.productName}</h5>
                    <p className="card-text">{product.productDescription}</p>
                    <p className="card-text">Price: ${product.productPrice}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container-fluid features py-5">
          <div className="container py-5">
            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="features-item text-center rounded bg-light p-4">
                  <div className="features-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                    <i className="fas fa-car-side fa-3x text-white"></i>
                  </div>
                  <div className="features-content text-center">
                    <h5>Never regret buying</h5>
                    <p className="mb-0">Free on order over 3000</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="features-item text-center rounded bg-light p-4">
                  <div className="features-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                    <i className="fas fa-user-shield fa-3x text-white"></i>
                  </div>
                  <div className="features-content text-center">
                    <h5>Security Payment</h5>
                    <p className="mb-0">100% security payment</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="features-item text-center rounded bg-light p-4">
                  <div className="features-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                    <i className="fas fa-exchange-alt fa-3x text-white"></i>
                  </div>
                  <div className="features-content text-center">
                    <h5>30 Day Return</h5>
                    <p className="mb-0">30 day money guarantee</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="features-item text-center rounded bg-light p-4">
                  <div className="features-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                    <i className="fa fa-phone-alt fa-3x text-white"></i>
                  </div>
                  <div className="features-content text-center">
                    <h5>24/7 Support</h5>
                    <p className="mb-0">Support every time fast</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
