import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-type": "application/json"  // Default content type for JSON requests
  }
});

// Update the default content type for file uploads
const uploadApi = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-type": "multipart/form-data"  // Default content type for file uploads
  }
});

const getAuthHeaders = () => {
  return {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  };
};

// User APIs
export const loginApi = (data) => Api.post("http://localhost:4000/api/user/login", data, { withCredentials: true,});
export const registerApi = (data) => Api.post("/api/user/register", data);
export const editProfileApi = (id, formData) => Api.put(`/api/user/edit_profile/${id}`, formData, getAuthHeaders());
export const uploadAvatarApi = (userId, formData) => Api.post(`/api/user/update/${userId}`, formData, getAuthHeaders()); 
export const createProductApi = (formData) => Api.post("/api/product/createProduct", formData, getAuthHeaders());
export const updateProductAPI = (id, formData) => Api.put(`/api/product/update_product/${id}`, formData, getAuthHeaders());
export const deleteProductAPI = (id) => Api.delete(`/api/product/${id}`, getAuthHeaders());
export const verifyEmailApi = (token) => {
  return Api.get(`/api/user/verify-email/${token}`);
};
// Example API call for logout
export const logoutApi = () => {
  return Api.post('/api/user/logout', {}, { withCredentials: true });
};

// Example API call to check if the session is still valid
export const checkSessionApi = () => {
  return Api.get('/api/user/check-session', { withCredentials: true });
};
export const getAllProductsAPI = () => Api.get("/api/product/getProducts");
export const getSingleProductAPI = (id) => Api.get(`/api/product/get_product/${id}`);

export const createBookingAPI = (data) => Api.post("/api/bookings", data, getAuthHeaders());
export const getBookingsAPI = () => Api.get("/api/bookings", getAuthHeaders());
export const getUserBookingsAPI = (userId) => Api.get(`/api/bookings/user/${userId}`, getAuthHeaders());
export const getBookingAPI = (id) => Api.get(`/api/bookings/${id}`, getAuthHeaders());
export const updateBookingAPI = (id, data) => Api.put(`/api/bookings/${id}`, data, getAuthHeaders());
export const deleteBookingAPI = (id) => Api.delete(`/api/bookings/${id}`, getAuthHeaders());

export const forgotPasswordApi = (data) => Api.post("/api/user/forgot-password", data);
export const resetPasswordApi = (data, token) => Api.put(`/api/user/reset-password/${token}`, data);

export const addToCartAPI = (productId, quantity) => Api.post("/api/cart/addtocart", { productId, quantity }, getAuthHeaders());
export const deleteCartProductApi = (id) => Api.delete(`/api/cart/delete/${id}`, getAuthHeaders());
export const getCartByUserIDApi = (userId) => Api.get(`/api/cart/${userId}`, getAuthHeaders());

export const getLoggedInUserDetail = (id) => Api.get(`/api/user/users/${id}`, getAuthHeaders());
export const updateLoggedInUserDetail = (id, userData) => Api.put(`/api/user/updateUser/${id}`, userData, getAuthHeaders());
export const updateUserApi = (id, userData) => Api.put(`/api/user/updateUser/${id}`, userData, getAuthHeaders());

export const changePasswordApi = (userId, data) => {
  return Api.put(`/api/user/changePassword`, {
    userId,
    oldPassword: data.oldPassword,
    newPassword: data.newPassword
  });
};



// Order APIs
export const createOrderApi = (data) => Api.post("/api/createOrder", data, getAuthHeaders());
export const getSingleOrderApi = (id) => Api.get(`/getSingleOrder/${id}`, getAuthHeaders());
export const getOrderByUserIDApi = (userId) => Api.get(`/api/createOrder/user${userId}`, getAuthHeaders());
export const getAllOrdersApi = () => Api.get("/orders", getAuthHeaders());
export const updateOrderStatusApi = (id, status) => Api.put(`/api/createorder/updateOrderStatus/${id}`, { status }, getAuthHeaders());
export const cancelOrderApi = (id) => Api.delete(`/api/createorder/cancelOrder/${id}`, getAuthHeaders());
export const updateReturnStatusApi = (id, data) => Api.put(`/api/createorder/updateReturnStatus/${id}`, data, getAuthHeaders());

// Shipping APIs
export const createShippingAddressAPI = (data) => Api.post('/api/shipping/createShippingAddress', data, getAuthHeaders());
export const getShippingAddressByUserIdAPI = (id) => Api.get(`/api/shipping/getShippingAddressByUserId/${id}`, getAuthHeaders());
export const updateShippingAddressAPI = (id, data) => Api.put(`/api/shipping/updateShippingAddress/${id}`, data, getAuthHeaders());
export const deleteShippingAddressAPI = (id) => Api.delete(`/api/shipping/deleteShippingAddress/${id}`, getAuthHeaders());

export default Api;
