import axios from "axios";
import { USER_LOCALSTORAGE_KEY } from "../const/localStorage";

// ✅ Используй свой Vercel URL
const baseURL = __IS_DEV__
  ? "http://localhost:8000"
  : "https://production-project-server.vercel.app";

export const $api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Интерсептор для авторизации
$api.interceptors.request.use((config) => {
  const userData = localStorage.getItem(USER_LOCALSTORAGE_KEY);
  if (userData) {
    try {
      const user = JSON.parse(userData);
      if (user?.id) {
         if (!config.headers) {
          config.headers = {};
        }
        config.headers.Authorization = `Bearer ${user.id}`;
      }
    } catch (e) {
      console.error("Error parsing user data", e);
    }
  }
  return config;
});
