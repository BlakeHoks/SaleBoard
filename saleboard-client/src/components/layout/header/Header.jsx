import styles from "./Header.module.scss";
import { Logo } from "../logo/Logo.jsx";
import { Link, NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";

export const Header = () => {
  return (
    <div className={styles.cont}>
      <Logo />
      <nav>
        <ul>
          <li>
            <NavLink to="profile">123</NavLink>
          </li>
          <li>
            <NavLink to="/">456</NavLink>
          </li>
          <li>Категории</li>
        </ul>
      </nav>
      <div>
        <input type="text" placeholder="Поиск" />
      </div>
      <Link to="profile">
        <FiUser />
      </Link>
    </div>
  );
};
