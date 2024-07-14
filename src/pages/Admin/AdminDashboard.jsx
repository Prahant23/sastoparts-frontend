import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createProductApi, deleteProductAPI, getAllProductsAPI } from "../../apis/Api";


const AdminDashboard = () => {
  // make a state for name, description, price, category
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [category, setCategory] = useState('');
 

  // make a state for image
  const[productImage,setProductImage] = useState(null);
  const[previewImage,setPreviewImage] = useState(null);
  // make a function to handle the image
  const handleImage = (event) => {  //handle image function
    const file = event.target.files[0];
    console.log(file);
    setProductImage(file);
      setPreviewImage(URL.createObjectURL(file));
  }
  const[products,setProducts] = useState([]);
  // load all products when page loads
  useEffect(()=>{
    getAllProductsAPI().then((res)=>{
      setProducts(res.data.products)
    })

  })
  // submit function
  const handelSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('productName', productName);
  formData.append('productPrice', productPrice);
  formData.append('productDescription', productDescription);
  formData.append('productCategory', category);
  formData.append('productImage', productImage);
  // send request to backend API with config
  createProductApi(formData).then((res) => {
    if (res.data.success === false) {
      toast.error(res.data.message)
    } else {
      toast.success(res.data.message)
    }
  }).catch((err) => {
    console.log(err)
    toast.error("Internal server error")
  });
}

  // delete product function
  const handleDelete = (id => { // Error: Missing parentheses around 'id'
    // confirm dialog box
    const confirm = window.confirm("Are you sure your wnat to delete?");
    if (!confirm) {
      return;
    } else {
      deleteProductAPI(id).then((res) => {
        if (res.data.success == false) {
          toast.error("res.data.message"); // Error: Should be `${res.data.message}`
        } else {
          toast.success(res.data.message);
          window.location.reload();
        }
      });
    }   
  });
  return (
    <>
      <div className="m-4">
        <div className="d-flex justify-content-between">
          <h1>Admin Dashbard</h1>
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
            tabindex="-1"
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
                  {/* Name, Description , price , Catagory(Select), Image */}
                  <label>Product Name</label>
                  <input
                  onChange={(e)=>{setProductName(e.target.value)}}
                    className="form-control"
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter product name"
                  />
                  <label>Product Description</label>
                  <textarea
                  onChange={(e)=>{setProductDescription(e.target.value)}}
                    className="form-control"
                    cols={4}
                    rows={4}
                    name=""
                    id=""
                    placeholder={"Enter product description"}
                  />
                  <label>Product Price</label>
                  <input
                  onChange={(e)=>{setProductPrice(e.target.value)}}
                    className="form-control"
                    type="number"
                    name=""
                    id=""
                    placeholder="Enter product price"
                  />
                  <label>Product Catagory</label>
                  <select onChange={(e)=>{setCategory(e.target.value)}} className="form-control" name="" id="">
                    <option value="">Select Catagory</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                  <label>Product Image</label>
                  <input onChange={handleImage} className="form-control" type="file" name="" id="" />
                  {/* Preview Image */}
                  {
                    previewImage && (
                      <img src={previewImage} className=""/>
                    )
                  }
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
        {/* 
      make table
       */}
        <table className="table mt-2">
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
           {
            products.map((product)=>{ 
              return(
                <tr>
                <td>
                  <img src={product.productImage} className="w-25" />
                </td>
                <td>{product.productName}</td>
                <td>{product.productPrice}</td>
                <td>{product.productDescription}</td>
                <td>{product.productCategory}</td>
                <td>
                <Link to={`/admin/edit-product/${product._id}`}className="btn btn-primary">Edit</Link>
                  <button onClick={()=>handleDelete(product._id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
              )
            })
           }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;
