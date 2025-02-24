import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  // const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const userRoleId = useSelector(state => state.user.role_id); 

  // Если пользователь не авторизован, перенаправляем на страницу входа
  // if (!isAuthenticated) {
  //   return <Navigate to="/auth" />;
  // }

  // Если пользователь авторизован, но его роль не совпадает с requiredRole, перенаправляем на 403
  if (userRoleId !== requiredRole) {
    return <Navigate to="/403" />;
  }

  // Если все проверки пройдены, отображаем защищенный компонент
  return children;
};

export default ProtectedRoute;