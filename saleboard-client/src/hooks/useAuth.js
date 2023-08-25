export const useAuth = () => {
  return {
    isAuth: !!localStorage.getItem("access_token"),
    logIn: (token) => {
      localStorage.setItem("access_token", token);
    },
    logOut: () => {
      localStorage.setItem("access_token", "");
    },
  };
};
