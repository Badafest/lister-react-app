import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_LOCAL_API_URL
      : process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.user && JSON.parse(localStorage.user).token;
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
