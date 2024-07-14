import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:4000", 
  headers: {
    "Content-type": "multipart/form-data"
  }
});

const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
};

export const loginApi = (data) => Api.post("/api/user/login", data);
export const registerApi = (data) => Api.post("/api/user/create", data);
export const editProfileApi = (id, formData) => Api.put(`/api/user/edit_profile/${id}`, formData, config);

export const createProductApi = (formData) => Api.post("/api/product/createProduct", formData, config);

export const getAllProductsAPI = () => Api.get("/api/product/getProduct");

export const createBookingAPI = (data) => Api.post("/api/bookings", data, config);

export const getBookingsAPI = () => Api.get("/api/bookings", config);

export const getSingleProductAPI = (id) => Api.get(`/api/product/get_product/${id}`);

export const getUserBookingsAPI = (userId) => {
  const token = localStorage.getItem('token');
  return Api.get(`/api/bookings/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getBookingAPI = (id) => {
  const token = localStorage.getItem('token');
  return Api.get(`/api/bookings/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateBookingAPI = (id, data) => {
  const token = localStorage.getItem('token');
  return Api.put(`/api/bookings/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteBookingAPI = (id) => {
  const token = localStorage.getItem('token');
  return Api.delete(`/api/bookings/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateProductAPI = (id, formData) => Api.put(`/api/product/update_product/${id}`, formData, config);

export const deleteProductAPI = (id) => Api.delete(`/api/product/deleteproduct/${id}`, config);

export const forgotPasswordApi = (data) => Api.post("/api/user/forgot/password", data);
export const resetPasswordApi = (data, token) => Api.put(`/api/user/password/reset/${token}`, data);
export const deleteCartProductApi = (id) => Api.delete(`/api/cart/delete/${id}`, config);

export const addToCartAPI = (productId, quantity) => Api.post("/api/cart/addtocart", { productId, quantity }, config);

export const getLoggedInUserDetail = (id) => {
  const token = localStorage.getItem("token");
  return Api.get(`/api/user/getUsers/${id}`, {
    headers: {
      "Content-type": "multipart/form-data",
      "authorization": `Bearer ${token}`,
    },
  });
};

export const updateLoggedInUserDetail = (id, userData) => {
  const token = localStorage.getItem('token');
  return Api.put(`/api/user/updateUser/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const checkoutOrder = async (data) => {
  try {
    const response = await Api.post('/api/order/checkout', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePasswordApi = (userId, passwords) =>
  Api.put(`/api/user/changePassword/${userId}`, passwords);

// Order API functions
export const createOrderAPI = (orderData) => Api.post("/api/orders", orderData, config);

export const getOrderAPI = (orderId) => Api.get(`/api/orders/${orderId}`, config);

export default Api;
