import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCurrentToken } from '../../redux/slices/authSlice';

function RequireAuth() {
  const token = localStorage.getItem('ACCESS_TOKEN');
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
export default RequireAuth;
