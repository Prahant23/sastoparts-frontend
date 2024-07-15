import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createProductApi, deleteProductAPI, getAllProductsAPI } from "../../apis/Api";

const AdminDashboard = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [category, setCategory] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProductsAPI()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleImage = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productPrice', productPrice);
    formData.append('productDescription', productDescription);
    formData.append('productCategory', category);
    formData.append('productImage', productImage);

    createProductApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setProductName('');
          setProductPrice('');
          setProductDescription('');
          setCategory('');
          setProductImage(null);
          setPreviewImage(null);
          getAllProductsAPI()
            .then((res) => {
              setProducts(res.data.products);
            })
            .catch((error) => {
              console.error('Error fetching products:', error);
            });
        }
      })
      .catch((err) => {
        console.error('Error creating product:', err);
        toast.error('Internal server error');
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) {
      return;
    } else {
      const authToken = localStorage.getItem('authToken');
      deleteProductAPI(id, authToken)
        .then((res) => {
          if (res.data.success === false) {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            setProducts(products.filter((product) => product._id !== id));
          }
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
          toast.error('Internal server error');
        });
    }
  };

  return (
    <>
      <div className="m-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Admin Dashboard</h1>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Product
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Create Product
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <label>Product Name</label>
                  <input
                    onChange={(e) => setProductName(e.target.value)}
                    className="form-control"
                    type="text"
                    placeholder="Enter product name"
                    value={productName}
                  />
                  <label>Product Description</label>
                  <textarea
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="form-control"
                    placeholder="Enter product description"
                    rows={4}
                    value={productDescription}
                  />
                  <label>Product Price</label>
                  <input
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="form-control"
                    type="number"
                    placeholder="Enter product price"
                    value={productPrice}
                  />
                  <label>Product Category</label>
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-control"
                    value={category}
                  >
                    <option value="">Select Category</option>
                    <option value="Engine and Transmission Components">Engine and Transmission Components</option>
                    <option value="Chassis and Suspension Components">Chassis and Suspension Components</option>
                    <option value="Electrical and Control Components">Electrical and Control Components</option>
                    <option value="other">Other</option>
                  </select>
                  <label>Product Image</label>
                  <input
                    onChange={handleImage}
                    className="form-control"
                    type="file"
                    accept="image/*"
                  />
                  {previewImage && (
                    <img
                      src={previewImage}
                      className="img-fluid mt-2"
                      alt="Preview"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button onClick={handelSubmit} type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">Product Image</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Price</th>
                <th scope="col">Product Description</th>
                <th scope="col">Product Category</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.productImage}
                      className="img-thumbnail"
                      alt="Product"
                      style={{ maxWidth: "100px", height: "100px" }}
                    />
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.productPrice}</td>
                  <td>{product.productDescription}</td>
                  <td>{product.productCategory}</td>
                  <td>
                    <Link
                      to={`/admin/edit-product/${product._id}`}
                      className="btn btn-primary me-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
