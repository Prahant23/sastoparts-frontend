import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-type": "multipart/form-data"
  }
});
export const editProfileAPI = (userData) => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  return Api.put('/user/edit-profile', userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


const config = {
  headers : {
    authorization : `Bearer ${localStorage.getItem("token")}`,
  }
}

export const loginApi = (data) => Api.post("/api/user/login", data);
export const registerApi = (data) => Api.post("/api/user/create", data);
export const editProfileApi = (id, formData) =>
  Api.put(`/api/user/edit_profile/${id}`, formData, config);

export const createProductApi = (formData) =>
  Api.post("/api/product/createProduct", formData, config);

export const getAllProductsAPI = () => Api.get("/api/product/getProduct");


export const getSingleProductAPI = (id) =>
  Api.get(`/api/product/get_product/${id}`);


export const updateProductAPI = (id, formData) =>
  Api.put(`/api/product/update_product/${id}`, formData); //api to updated product

export const deleteProductAPI = (id) =>
  Api.delete(`/api/product/delete_product/${id}`);

  export const forgotPasswordApi = (data) =>Api.post("/api/user/forgot/password", data);
  export const resetPasswordApi = (data, token) =>Api.put(`/api/user/password/reset/${token}`, data);
  export const deleteCartProductApi = (id) =>Api.delete(`/api/cart/delete/${id}`,config)

  export const addToCartAPI = (productId, quantity) => 
  Api.post("/api/addtocart", { productId, quantity }, config());
  // export const getLoggedInUserDetail = () => Api.get(`/api/user/getUsers`);
  export const updateLoggedInUserDetail = (id, userData) => {
    const token = localStorage.getItem('token');
    return Api.put(`/api/user/updateUser/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
export const getLoggedInUserDetail = (id) =>{
  const token = localStorage.getItem("token");
  return Api.get(`/api/user/getUsers/${id}`, {  // Update route path to /getUsers/:id
    headers: {
      "Content-type": "multipart/form-data",
      "authorization": `Bearer ${token}`,
    },
  });
}



export const checkoutOrder = async (data) => {
  try {
    const response = await Api.post('/order/checkout', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


  

export default Api;
