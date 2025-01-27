import React from 'react';
import { useSelector } from 'react-redux'; // Импортируем useSelector

const ForbiddenPage = () => {
  // Получаем роль пользователя из Redux store
  const userRole = useSelector(state => state.user.role);

  // Выводим роль пользователя в консоль
  console.log('Роль пользователя:', userRole);

  return (
    <div>
      <h1>403 - Доступ запрещен</h1>
      <p>У вас нет прав для доступа к этой странице.</p>
    </div>
  );
};

export default ForbiddenPage;