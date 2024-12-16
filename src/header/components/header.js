import { Icon } from "../../reUseComponents/icon";
import { Link } from "react-router-dom";
import { ControlPanel } from "./control-panel";

export const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <Icon className="iconHeader">Главная</Icon>
      </Link>
      <ControlPanel />
    </div>
  );
};