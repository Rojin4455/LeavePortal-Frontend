import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ManagerProtectedRoute({ children }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.accessToken || user.userType !== 'manager') {
      navigate('/manager/login');
    }
  }, [user, navigate]);

  if (user.accessToken && user.userType === 'manager') {
    return children;
  }

  return null;
}

export default ManagerProtectedRoute;
