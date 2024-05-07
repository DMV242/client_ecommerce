import axios from "axios";
import { getAllUsers } from "../redux/slice/User";

const BASE_URL = "http://127.0.0.1:8000";

const User = {
  getUserByEmail(email) {
    return axios.get(`${BASE_URL}/user`, {
      headers: {
        email: email,
      },
    });
  },
  postUser(data) {
    return axios.post(`${BASE_URL}/user`, data);
  },
  postInfoUser(data, token) {
    return axios.post(`${BASE_URL}/one-user`, data, {
      headers: {
        Authorization: token,
      },
    });
  },
  getUser(data) {
    return axios.post(`${BASE_URL}/login`, data);
  },
  getUserGoogle(data) {
    return axios.post(`${BASE_URL}/login/google`, data);
  },
  getOneUser(token) {
    return axios.get(`${BASE_URL}/one-user`, {
      headers: {
        Authorization: token,
      },
    });
  },
  updatePasswordUser(data) {
    return axios.post(`${BASE_URL}/reset-password`, data);
  },
  getAllUsers(token) {
    return axios.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  deleteUser(userId) {
    return axios.delete(`${BASE_URL}/delete-user-by-id`, {
      headers: {
        "user-id": userId,
      },
    });
  },
};

export { User };
