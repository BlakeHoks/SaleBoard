export const UseAuth = () => {
  return {
    isAuth: !!localStorage.getItem("access_token"),
  };
};
