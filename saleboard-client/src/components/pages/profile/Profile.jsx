import { useQuery } from "@tanstack/react-query";
import { AuthService } from "../../../services/auth.service.js";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { data } = useQuery(["profile"], () => AuthService.getUserProfile());

  const nav = useNavigate();
  const logout = () => {
    localStorage.setItem("access_token", "");
    nav("/");
  };

  return (
    <div>
      <div>{data?.name}</div>
      <div>
        <img src={data?.image} alt="Фото" />
      </div>
      <button onClick={logout}>Выйти из аккаунта</button>
    </div>
  );
};
