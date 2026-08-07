import axios from "axios";
import { USER_LOCALSTORAGE_KEY } from "../const/localStorage";

const baseURL = __IS_DEV__ ? "http://localhost:8000" : "https://production.com";
export const $api = axios.create({
  baseURL: baseURL,
  headers: {
    authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || "",
  },
});
 