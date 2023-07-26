import { Outlet } from "react-router-dom";
import { Header } from "./header/Header.jsx";

export const Layout = () => {
  return (
    <div>
      <Header></Header>
      <Outlet />
    </div>
  );
};
