import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminPanelSchema, AdminUser } from "../types/admin";

const initialState: AdminPanelSchema = {
  users: [],
  stats: {
    totalUsers: 0,
    totalArticles: 0,
    totalComments: 0,
    averageRating: 0,
  },
  isLoading: false,
  error: undefined,
  searchQuery: "",
};

export const adminPanelSlice = createSlice({
  name: "adminPanel",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<AdminUser[]>) => {
      state.users = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<AdminUser>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id,
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
  },
});

export const adminPanelReducer = adminPanelSlice.reducer;
export const adminPanelActions = adminPanelSlice.actions;
