import { useForm } from "react-hook-form";

export const Auth = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  //console.log(watch("example"));
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Email" {...register("email")} />
      <input
        placeholder="Пароль"
        {...register("password", { required: true })}
      />
      {errors.password && <span>This field is required</span>}

      <button>Войти</button>
    </form>
  );
};
