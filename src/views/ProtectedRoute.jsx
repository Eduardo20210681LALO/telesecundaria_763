import { Navigate, Outlet } from "react-router-dom"
import Cookies from 'js-cookie';

const generateRandomToken = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
};

const ProtectedRoute = () => {
  let token = Cookies.get('token');

  if (!token) {
    console.log('Generado')
    token = generateRandomToken(32);
    const expirationDays = 7;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);
    Cookies.set('token', token, { expires: expirationDate });
  }
  
  return token ? <Outlet /> : <Navigate to="/Home" replace />;
}

export default ProtectedRoute;