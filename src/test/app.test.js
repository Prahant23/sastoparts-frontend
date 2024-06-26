import axios from "axios";
import loginmock from "../mock/loginmock";
import registermock from "../mock/registermock";
const backendURL = "http://localhost:4000";


describe("App Testing", () => {
  //Login
  it("POST /api/user/login | Login Successful", async () => {
    const response = await axios.post(
      `${backendURL}/api/user/login`,
      loginmock
    );
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.token).toBeDefined();
  });

//   it("POST /api/user/create | Response with success message", async () => {
//     const response = await axios.post(
//         `${backendURL}/api/user/create`,
//             "firstName" = "fff",
//             "lastName"= "sgbvfs",
//             "email"= "prasffhfant@gmail.com ",
//             "password"= "dgbvfsdg",
//     );     
  
//     console.log(response);
//     expect(response.status).toBe(200);
//     expect(response.data.success).toBe(true);
//     expect(response.data.token).toBeDefined();
//   });
  
  
it("GET /api/user/getUsers/:id | Should work", async () => {
    const response = await axios.get(`${backendURL}/api/user/getUsers/65a92027165b61690f262ae2`);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Users fetched successfully.");
    expect(response.data.user).toBeDefined();
  });

  it("GET /api/product/getProduct/ | Should work", async () => {
    const response = await axios.get(`${backendURL}/api/product/getProduct/`);
    expect(response.status).toBe(200);
  });
  it("GET /api/product/getProduct/ | Should work", async () => {
    const response = await axios.get(`${backendURL}/api/product/getProduct/`);
    expect(response.data.message).toBe("All Products");
  });
  
  it("GET /api/product/getProduct/ | Should work", async () => {
    const response = await axios.get(`${backendURL}/api/product/getProduct/`);
    expect(response.data.products).toBeDefined();
  });



  it("GET /api/product/getProductByUserId/:userId | Should work", async () => {
    const response = await axios.get(`${backendURL}/api/product/getProductByUserId/65cb0b63346f90fb6377a9cb `);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Single Product");
    expect(response.data.products).toBeDefined();
  });

  it("DELETE /api/product/deleteProduct/:productId | Should work", async () => {
    const response = await axios.delete(`${backendURL}/api/product/deleteProduct/65cafe8442a4cbefa7c3c57e`);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Product deleted successfully.");
    expect(response.data.products).toBeDefined();
  });

  it("DELETE /api/cart/delete/:id | Should work", async () => {
    const response = await axios.delete(
      `${backendURL}/api/cart/delete/65e238d2d6382127185fc8f5`, 
    );
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Cart item deleted successfully");
    expect(response.data.product).toBeDefined();
  });
});




  


  






