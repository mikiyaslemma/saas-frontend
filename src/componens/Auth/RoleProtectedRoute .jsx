import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from './AuthContext';
import { canAccessResource } from './Services/SecurityService';

const RoleProtectedRoute = ({ requiredResourceName, children }) => {
  const { authState } = useContext(AuthContext);
  const { isAuthenticated, roles } = authState;
  const [canAccess, setCanAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!roles) return;
  
      try {
        const access = await canAccessResource(requiredResourceName, roles);
        console.log(requiredResourceName,roles);
        console.log('Access:', access);
        setCanAccess(access);
      } catch (error) {
        console.error('Access check failed:', error);
      } finally {
        setLoading(false);
      }
    };
  
    checkAccess();
  }, [roles, requiredResourceName]);
   console.log(`is authenticated ${isAuthenticated}`);

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  if (loading) return null; // Optionally, render a loading spinner

  return canAccess ? (children ? children : <Outlet />) : <Navigate to="/denied-access" replace />;
};

export default RoleProtectedRoute;