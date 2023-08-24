import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../../../services/auth.service.js";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import styles from "./Profile.module.scss";
import { PiCameraRotateFill } from "react-icons/pi";

export const Profile = () => {
  const queryClient = useQueryClient();
  const imagePicker = useRef(null);
  const { data } = useQuery(["profile"], () => AuthService.getUserProfile());
  const { mutate } = useMutation(
    ["profile_image"],
    (data) => AuthService.addProfileImage(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile"]);
      },
    },
  );
  const [newProfileImage, setNewProfileImage] = useState();
  const nav = useNavigate();
  const logout = () => {
    localStorage.setItem("access_token", "");
    nav("/");
  };

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    mutate(formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgNameCont}>
        <a>
          <img src={`/uploads/${data?.image}`} alt="Фото" />
          <span
            className={styles.mask}
            onClick={(event) => {
              imagePicker.current.click();
            }}
          >
            <PiCameraRotateFill style={{ width: "" }} />
            <p>Изменить фотографию</p>
            <input
              type="file"
              accept="image/*"
              ref={imagePicker}
              onChange={(e) => handleChange(e)}
            />
          </span>
        </a>
        <p>{data?.name}</p>
      </div>
      <div>
        <button
          style={{
            width: "100px",
            height: "30px",
            fontSize: "14px",
            borderRadius: "7px",
          }}
          onClick={logout}
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
};
