import axios from "axios";
import { getTokens, removeLocalUser, removeTokens } from "./constants";

const baseURL = import.meta.env.VITE_BCKEND_URL;
const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const {
      access: { token },
    } = JSON.parse(getTokens()) || {
      access: { token: "" },
    };
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    } else {
      window.location.href = "/";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      removeTokens();
      removeLocalUser();
      window.location.href = "/login";
      return;
    } else {
      throw new Error(error?.message);
    }
  }
);

export default instance;
