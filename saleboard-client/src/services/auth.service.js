import axios from "axios";

export const AuthService = {
  async login(data) {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/auth/login",
      data,
    );
    return response.data;
  },
  async register(data) {
    return (await axios.post("http://127.0.0.1:5000/api/auth/register", data))
      .data;
  },
};
