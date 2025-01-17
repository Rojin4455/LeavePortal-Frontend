import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminProtectedRoute({ children }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.accessToken || user.userType !== 'admin') {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  if (user.accessToken && user.userType === 'admin') {
    return children;
  }

  return null;
}

export default AdminProtectedRoute;
