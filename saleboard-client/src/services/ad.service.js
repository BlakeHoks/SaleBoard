import axios from "axios";

export const AdService = {
  async getAll() {
    const response = await axios.get("http://127.0.0.1:8000/tests/");
    return response.data;
  },
  async getById(id) {
    const response = await axios.get("http://127.0.0.1:5000/api/ad/" + id);
    return response.data;
  },
};
