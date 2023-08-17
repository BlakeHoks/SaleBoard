import { Outlet } from "react-router-dom";
import { Header } from "./header/Header.jsx";
import styles from "./Layout.module.scss";

export const Layout = () => {
  return (
    <div>
      <Header></Header>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
};
