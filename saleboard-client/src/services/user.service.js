import axios from "axios";

export const UserService = {
  async addProfileImage(data) {
    return (
      await axios.post("http://127.0.0.1:5000/api/user/change-image", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
    ).data;
  },
};
