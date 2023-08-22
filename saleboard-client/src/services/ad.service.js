import axios from "axios";

export const AdService = {
  async getAll() {
    const response = await axios.get("http://127.0.0.1:5000/api/ad/");
    return response.data;
  },
  async getByCategory(category) {
    const response = await axios.get(
      "http://127.0.0.1:5000/api/ad/category/" + category,
    );
    return response.data;
  },
  async getById(id) {
    const response = await axios.get("http://127.0.0.1:5000/api/ad/" + id);
    return response.data;
  },
  async create(data) {
    return await axios.post("http://127.0.0.1:5000/api/ad/", data);
  },
};
