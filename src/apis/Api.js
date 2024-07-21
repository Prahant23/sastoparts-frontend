import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-type": "multipart/form-data"  // Default content type for file uploads
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
export const updateProductAPI = (id, formData) => Api.put(`/api/product/update_product/${id}`, formData, config);
export const deleteProductAPI = (id) => Api.delete(`/api/product/${id}`, config);

export const getAllProductsAPI = () => Api.get("/api/product/getProducts");
export const getSingleProductAPI = (id) => Api.get(`/api/product/get_product/${id}`);

export const createBookingAPI = (data) => Api.post("/api/bookings", data, config);
export const getBookingsAPI = () => Api.get("/api/bookings", config);
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

export const forgotPasswordApi = (data) => Api.post("/api/user/forgot/password", data);
export const resetPasswordApi = (data, token) => Api.put(`/api/user/password/reset/${token}`, data);

export const addToCartAPI = (productId, quantity) => Api.post("/api/cart/addtocart", { productId, quantity }, config);
export const deleteCartProductApi = (id) => Api.delete(`/api/cart/delete/${id}`, config);
export const getCartByUserIDApi = (userId) => {
  const token = localStorage.getItem('token');
  return Api.get(`/api/cart/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

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

export const updateUserApi = (id, userData) => {
  return Api.put(`/api/user/updateUser/${id}`, userData, config);
};
export const changePasswordApi = (userId, passwords) =>
  Api.put(`/api/user/changePassword/${userId}`, passwords);

// Order APIs
export const createOrderApi = (data) => Api.post("/api/createOrder", data, config);
export const getSingleOrderApi = (id) => Api.get(`/getSingleOrder/${id}`, config);
export const getOrderByUserIDApi = (userId) => Api.get(`/api/createOrder/user${userId}`, config);
export const getAllOrdersApi = () => Api.get("/orders", config);
export const updateOrderStatusApi = (id, data) => Api.put(`/updateOrderStatus/${id}`, data, config);
export const cancelOrderApi = (id) => Api.delete(`/cancelOrder/${id}`, config);
export const updateReturnStatusApi = (id, data) => Api.put(`/updateReturnStatus/${id}`, data, config);


//shipping api
export const createShippingAddressAPI = (data) => Api.post('/api/shipping/createShippingAddress', data, config);
export const getShippingAddressByUserIdAPI = (id, data) => {
  const token = localStorage.getItem('token');
  return Api.get(`/api/shipping/getShippingAddressByUserId/${id}`, data,{
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const updateShippingAddressAPI = (id, data) => {
  const token = localStorage.getItem('token');
  return Api.put(`/api/shipping/updateShippingAddress/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const deleteShippingAddressAPI = (id) => {
  const token = localStorage.getItem('token');
  return Api.delete(`/api/shipping/deleteShippingAddress/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export default Api;
