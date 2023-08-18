import { useForm } from "react-hook-form";
import styles from "./AdCreate.module.scss";
import { Button } from "../../ui/button/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AdService } from "../../../services/ad.service.js";
import { BsImages } from "react-icons/bs";

export const AdCreate = () => {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation(
    ["createAd"],
    (data) => AdService.create(data),
    {
      onSuccess: (data) => {
        console.log("Success", data);
        nav(`/ad/${data.data.id}`);
      },
    },
  );

  const onSubmit = (data) => {
    console.log(data);
    data.image = [""];
    data.authorId = data.price + 0;
    data.price = data.price + 0;
    mutate(data);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Название"
          {...register("title", { required: true })}
        />
        <input
          type="text"
          placeholder="Цена"
          {...register("price", { required: true })}
        />
        <input
          type="text"
          placeholder="Описание"
          {...register("description", { required: true })}
        />
        <input
          type="number"
          placeholder="authorId"
          {...register("authorId", { required: true })}
        />
        <input
          type="text"
          placeholder="Адрес"
          {...register("address", { required: true })}
        />
        <input
          type="text"
          placeholder="categoryName"
          {...register("categoryName", { required: true })}
        />
        <label>
          Загрузить фотографии
          <input
            className={styles.file}
            type="file"
            id="file"
            multiple
            {...register("image")}
          />
          <BsImages />
        </label>
        <Button>Создать</Button>
      </form>
    </div>
  );
};