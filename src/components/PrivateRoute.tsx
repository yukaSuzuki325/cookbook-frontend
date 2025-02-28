import { Navigate, Outlet } from 'react-router-dom'; //Navigate is a component
import { useAuthSelector } from '../features/auth/hooks';

const PrivateRoute = () => {
  const { userInfo } = useAuthSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
