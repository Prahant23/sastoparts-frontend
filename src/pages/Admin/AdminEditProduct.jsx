import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getSingleProductAPI, updateProductAPI } from '../../apis/Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiArrowLeft } from 'react-icons/fi'; // Importing the back icon

const AdminEditProducts = () => {
    const { id } = useParams(); // Access id parameter from URL

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [oldImage, setOldImage] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getSingleProductAPI(id)
            .then((res) => {
                const { productName, productPrice, productDescription, productCategory, productImageUrl } = res.data.product;
                setProductName(productName);
                setProductPrice(productPrice);
                setProductDescription(productDescription);
                setProductCategory(productCategory);
                setOldImage(productImageUrl);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
            });
    }, [id]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setProductImage(file);
        setPreviewImage(URL.createObjectURL(file)); // Set previewImage to show selected image
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productPrice', productPrice);
        formData.append('productDescription', productDescription);
        formData.append('productCategory', productCategory);
        formData.append('productImage', productImage);

        updateProductAPI(id, formData)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                    navigate('/Admin/dashboard');
                }
            })
            .catch((err) => {
                console.error('Error updating product:', err);
                toast.error('Internal Server Error!');
            });
    };

    return (
        <div className="container-fluid mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Link to="/Admin" className="btn btn-secondary"><FiArrowLeft className="me-1" /> Back to Dashboard</Link>
                <h3 className="text-center mb-0">Editing product - <span className="text-danger">{productName}</span></h3>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
                        <label className="mb-2">Product Name</label>
                        <input
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="form-control mb-2"
                            type="text"
                            placeholder="Enter product name"
                            required
                        />
                        <label className="mb-2">Product Description</label>
                        <textarea
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            className="form-control mb-2"
                            placeholder="Enter description"
                            rows="4"
                            required
                        ></textarea>
                        <label className="mb-2">Price</label>
                        <input
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            type="number"
                            className="form-control mb-2"
                            placeholder="Enter your price"
                            required
                        />
                        <label className="mb-2">Select category</label>
                        <select
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                            className="form-control mb-2"
                            required
                        >
                            <option value="Clothes">Clothes</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                        <label className="mb-2">Product Image</label>
                        <input onChange={handleImageUpload} type="file" className="form-control mb-2" />
                        {/* Display selected image preview */}
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt="Selected product"
                                className="img-fluid rounded mb-3"
                                style={{ maxHeight: '300px', maxWidth: '100%', height: 'auto' }}
                            />
                        )}
                        <button type="submit" className="btn btn-primary w-100 mt-2">Update Product</button>
                    </form>
                </div>
                <div className="col-lg-6">
                    <div className="bg-light p-4 rounded">
                        <h6 className="text-center mb-3">Old Image Preview</h6>
                        <img
                            src={oldImage}
                            alt="Old product"
                            className="img-fluid rounded mb-3"
                            style={{ maxHeight: '300px', maxWidth: '100%', height: 'auto' }}
                        />
                        <h6 className="text-center mb-3">New Image Preview</h6>
                        {/* Display new image preview */}
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="New product"
                                className="img-fluid rounded mb-3"
                                style={{ maxHeight: '300px', maxWidth: '100%', height: 'auto' }}
                            />
                        ) : (
                            <p className="text-center">No image selected!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminEditProducts;
