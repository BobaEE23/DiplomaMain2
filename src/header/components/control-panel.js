import { Icon } from "../../reUseComponents/icon";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserRole, setUserName, setUserAuthenticated } from "../../actions";

export const ControlPanel = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUserRole(null));
    dispatch(setUserName(null));
    dispatch(setUserAuthenticated(false));
  };

  return (
    <div className="controlPanel">
      {!user || !user.isAuthenticated ? (
        <>
          <Link to="/register">
            <Icon className="btnIconControlPanel">Регистрация</Icon>
          </Link>
          <Link to="/auth">
            <Icon className="btnIconControlPanel">Аутентификация</Icon>
          </Link>
        </>
      ) : (
        <>
          <span>{user.name}</span>
          {user.role === 0 ? (
            <>
              <Link to="/admin">
                <Icon className="btnIconControlPanel">Панель админа</Icon>
              </Link>
              <Link to="/cart">
                <Icon className="btnIconControlPanel">Корзина</Icon>
              </Link>
              <Link to="/" onClick={handleLogout}>
                <Icon className="btnIconControlPanel">Выйти</Icon>
              </Link>
            </>
          ) : (
            <>
              <Link to="/cart">
                <Icon className="btnIconControlPanel">Корзина</Icon>
              </Link>
              <Link to="/" onClick={handleLogout}>
                <Icon className="btnIconControlPanel">Выйти</Icon>
              </Link>
            </>
          )}
        </>
      )}
    </div>
  );
};