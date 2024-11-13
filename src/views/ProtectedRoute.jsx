// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

const ProtectedRoute = ({ requiredRole }) => {
  const idUsuario = localStorage.getItem('idUsuario'); // Obtén el ID del usuario actual
  const token = idUsuario ? Cookies.get(`token_${idUsuario}`) : null; // Obtén el token específico del usuario
  const rol = localStorage.getItem('rol'); // Rol del usuario

  // Verifica si el token existe
  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  // Verifica si el rol requerido coincide con el rol del usuario
  if (requiredRole && rol !== requiredRole) {
    return <Navigate to="/NotFound" replace />;
  }

  return <Outlet />;
};

// Rutas protegidas específicas para cada rol
export const ProtectedRouteDirectivo = () => <ProtectedRoute requiredRole="directivo" />;
export const ProtectedRouteAdministrativo = () => <ProtectedRoute requiredRole="administrativo" />;
export const ProtectedRouteDocente = () => <ProtectedRoute requiredRole="docente" />;

export default ProtectedRoute;
