import React from 'react';


const ForbiddenPage = () => {
  // Получаем роль пользователя из Redux store
  

 

  return (
    <div>
      <h1>403 - Доступ запрещен</h1>
      <p>У вас нет прав для доступа к этой странице.</p>
    </div>
  );
};

export default ForbiddenPage;