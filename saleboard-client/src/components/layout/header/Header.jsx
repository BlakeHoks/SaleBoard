import styles from "./Header.module.scss";
import { Logo } from "../logo/Logo.jsx";
import { Link, NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import Hamburger from "../hamburger/Hamburger.jsx";
import { IoMdAddCircleOutline } from "react-icons/io";

export const Header = () => {
  return (
    <div className={styles.cont}>
      <Link to="/">
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Главная</NavLink>
          </li>
          <li>
            <NavLink to="/">Контакты</NavLink>
          </li>
          <li>
            <Hamburger text="Категории" />
          </li>
        </ul>
      </nav>
      <input type="text" placeholder="Поиск" />
      <div className={styles.plusCont}>
        <Link to="ad/create">
          Создать
          <IoMdAddCircleOutline style={{ fontSize: "25px" }} />
        </Link>
      </div>
      <div className={styles.profileButton}>
        <Link to="profile">
          Профиль
          <FiUser />
        </Link>
      </div>
    </div>
  );
};
