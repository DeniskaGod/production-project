import axios from "axios";
import { USER_LOCALSTORAGE_KEY } from "../const/localStorage";

const baseURL = __IS_DEV__ ? "http://localhost:8000" : "https://production.com";
// Можно сделать __API__ и использовать его везде, где нужно обращаться к API, чтобы не хардкодить URL
export const $api = axios.create({
  baseURL: baseURL,
  headers: {
    authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || "",
  },
});
