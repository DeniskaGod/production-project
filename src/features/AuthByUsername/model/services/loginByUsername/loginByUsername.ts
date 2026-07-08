import { ThunkConfig } from "@/app/providers/StoreProvider";
import { User, userActions } from "@/entities/User";
import i18n from "@/shared/config/i18n/i18n";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localStorage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { $api } from "@/shared/api/api";

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>("login/loginByUsername", async ({ username, password }, thunkAPI) => {
  try {
    const response = await thunkAPI.extra.api.post<User>("/login", {
      username,
      password,
    });

    if (!response.data) {
      throw new Error();
    }

    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));

    // ✅ Обновляем заголовок axios
    $api.defaults.headers.common.Authorization = `Bearer ${response.data.id}`;

    thunkAPI.dispatch(userActions.setAuthData(response.data));
    const { navigate } = thunkAPI.extra as { navigate: NavigateFunction };
    navigate("/");
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(
      i18n.t("Вы ввели неправильный логин или пароль"),
    );
  }
});
