import { Icon } from "../../reUseComponents/icon";
import { Link } from "react-router-dom";
import { ControlPanel } from "./control-panel";
import iconMain from "./iconMain.png"; // <-- импорт картинки

export const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <Icon className="iconHeader">
          <img width={150} src={iconMain} alt="Логотип сайта" />
        </Icon>
      </Link>
      <ControlPanel />
    </div>
  );
};
