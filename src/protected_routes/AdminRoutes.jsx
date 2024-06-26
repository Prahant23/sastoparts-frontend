import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AdminRoutes = () => {
  // get user data
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null && !user.isAdmin) {
      navigate("/login");
    }
  }, [user, navigate]);

  return user !== null && user.isAdmin ? <Outlet /> : null;
}

export default AdminRoutes;
