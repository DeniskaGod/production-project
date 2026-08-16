import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserSchema } from "../types/user";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localStorage";

const initialState: UserSchema = {
  _inited: false,
};

const normalizeUserRoles = (user: User): User => {
  const roles = user.roles ?? user.role ?? [];
  return {
    ...user,
    roles,
    role: roles,
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = normalizeUserRoles(action.payload);
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
      if (user) {
        state.authData = normalizeUserRoles(JSON.parse(user));
      }
      state._inited = true;
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
      // ✅ Убираем window.location.href
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
