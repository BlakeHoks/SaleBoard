import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthService } from "../../../services/auth.service.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Profile = () => {
  const { data } = useQuery(["profile"], () => AuthService.getUserProfile());
  const { mutate } = useMutation(["profile_image"], (data) =>
    AuthService.addProfileImage(data),
  );
  const [newProfileImage, setNewProfileImage] = useState();
  const nav = useNavigate();
  const logout = () => {
    localStorage.setItem("access_token", "");
    nav("/");
  };

  const handleClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", newProfileImage);
    console.log(newProfileImage);
    mutate(formData);
  };

  const handleChange = (e) => {
    setNewProfileImage(e.target.files[0]);
  };

  return (
    <div>
      <div>{data?.name}</div>
      <div>
        <img src={data?.image} alt="Фото" />
      </div>
      <input type="file" onChange={(e) => handleChange(e)} />
      <button onClick={(e) => handleClick(e)}>Изменить фото</button>
      <button onClick={logout}>Выйти из аккаунта</button>
    </div>
  );
};
