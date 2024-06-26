  import React from 'react'
  import { Outlet, useNavigate } from 'react-router-dom';

  const UserRoutes = () => {
      // get user data
      const user = JSON.parse(localStorage.getItem("user"));
      const navigate = useNavigate();
    return user!= null && !user.isAdmin ? <Outlet/> : navigate("/login"); //login for admin 
    
  }
  export default UserRoutes
