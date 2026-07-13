import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile, ProfileSchema } from "../types/profile";
import { fetchProfileData } from "../services/fetchProfileData/fetchProfileData";
import { updateProfileData } from "../services/updateProfileData/updateProfileData"; // ✅ импорт

const initialState: ProfileSchema = {
  data: undefined,
  form: undefined,
  isLoading: false,
  error: undefined,
  readonly: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setReadonly(state, action: PayloadAction<boolean>) {
      state.readonly = action.payload;
    },
    cancelEdit(state) {
      state.readonly = true;
      state.form = state.data;
      state.validateErrors = undefined;
    },
    updateProfile(state, action: PayloadAction<Profile>) {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProfileData
      .addCase(fetchProfileData.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchProfileData.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.form = action.payload;
        },
      )
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = Array.isArray(action.payload)
          ? action.payload.join(", ")
          : action.payload;
      })
      .addCase(updateProfileData.pending, (state) => {
        state.validateErrors = undefined;
        state.isLoading = true;
      })
      .addCase(
        updateProfileData.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.form = action.payload;
          state.readonly = true;
          state.validateErrors = undefined; 
        },
      )
      .addCase(updateProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.validateErrors = action.payload
      });
  },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
