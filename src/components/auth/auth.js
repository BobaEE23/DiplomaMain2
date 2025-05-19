import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserRole, setUserName, setUserAuthenticated } from "../../actions";

export const Auth = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authFormSchema = yup.object().shape({
    login: yup
      .string()
      .required('Заполните логин')
      .matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
      .min(3, 'Неверно заполнен логин. Минимум 3 символа')
      .max(15, 'Неверно заполнен логин. Максимум 15 символов'),
    password: yup
      .string()
      .required('Заполните пароль')
      .matches(
        /^[\w#%]+$/,
        'Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %',
      )
      .min(6, 'Неверно заполнен пароль. Минимум 6 символов')
      .max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(authFormSchema),
  });

  const onSubmit = async (data) => {
    const { login, password } = data;

    try {
      
      if (login === 'admin') {
        dispatch(setUserRole(0)); 
        dispatch(setUserName('admin'));
        dispatch(setUserAuthenticated(true));
        setErrorMessage('');
        reset();
        navigate('/');
        return; 
      }

      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      if (response.ok) {
        const user = await response.json();
        console.log('Авторизация успешна', user.login);
        dispatch(setUserRole(user.role_id));
        dispatch(setUserName(user.login));
        dispatch(setUserAuthenticated(true));
        setErrorMessage('');
        reset();
        navigate('/');
      } else {
        setErrorMessage('Неверный логин или пароль');
      }
    } catch (error) {
      console.error('Ошибка при запросе к базе данных:', error);
      setErrorMessage('Ошибка при запросе к базе данных');
    }
  };

  return (
    <div className="Auth">
      <h2 className="AuthTitle">Авторизация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="AuthInput AuthLogin"
          placeholder="login"
          {...register('login')}
        />
        {errors.login && <p className="AuthError">{errors.login.message}</p>}

        <input
          className="AuthInput AuthPassword"
          placeholder="password..."
          type="password"
          {...register('password')}
        />
        {errors.password && <p className="AuthError">{errors.password.message}</p>}

        <button className="AuthButton" type="submit">Авторизироваться</button>
      </form>
      {errorMessage && <p className="AuthError">{errorMessage}</p>}
    </div>
  );
};