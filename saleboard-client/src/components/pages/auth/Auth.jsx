import { useForm } from "react-hook-form";
import { Button } from "../../ui/button/Button.jsx";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../services/auth.service.js";
import styles from "./Auth.module.scss";
import { useState } from "react";

export const Auth = () => {
  const nav = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation(["auth"], (data) => AuthService.login(data), {
    onSuccess: (data) => {
      console.log("Success", data);
      nav(`/profile`);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    mutate(data);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("lol");
  };

  return (
    <div>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Введите email</span>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Пароль"
            {...register("password", { required: true })}
          />
          {errors.password && <span>Введите пароль</span>}
        </div>
        <div className={styles.buttonCont}>
          <Button>Войти</Button>
          <button
            style={{ marginLeft: "40px" }}
            className={styles.regButton}
            onClick={(e) => handleClick(e)}
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
};
