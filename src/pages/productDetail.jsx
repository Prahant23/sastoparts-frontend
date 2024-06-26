import React, { useEffect, useState } from "react";
const ProductDetails = () => {
  useEffect(() => {
    getProduct(id).then((res) => {
      console.log(res.data);
      setProduct(res.data);
    });
  }, []);

  const [cartValue , setCartValue ] = useState(1);

  const increaseCartValue = () =>{
    setCartValue(cartValue + 1);
  }
  const decreaseCartValue = () =>{
    setCartValue(cartValue - 1);
  }
  
// const dispatch = useDispatch();
// const handleAddToCart = () =>{
//   const cartItem =  {
//     id :  product. _id,
//     name : product.name,
//     image : product.image,
//     category : product.category,
//     quantity :cartvalue,
//   };
//   dispatch(addtocart(cartItem));
// }

  return (
    <div className="container mt-5">
      <div className="d-flex">
        <img
          className="object-cover rounded-3"
          height={"500px"}
          width={"600px"}
          src="https://images.unsplash.com/photo-1523381210434-
271e8be1f52b?ixlib=rb4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
        <div className="ms-3 mt-4">
          <span className="fs-3 fw-bold">
            Branded T-Shirt for sale, Limited edition
          </span>
          <p className="fs-4">Price: $100</p>
          <p className="fs-4">Category : T-Shirt</p>
          <p className="fs-4">
            Description : Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam, voluptatum.
          </p>
          <button className="btn btn-primary">Add to cart</button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
