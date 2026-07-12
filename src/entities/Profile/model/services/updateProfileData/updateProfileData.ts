// entities/Profile/model/services/updateProfileData/updateProfileData.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Profile } from "../../types/profile";
import { StateSchema, ThunkConfig } from "@/app/providers/StoreProvider";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
>("profile/updateProfileData", async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;

  try {
    const state = getState() as StateSchema;
    const formData = getProfileForm(state);

    console.log("Sending formData:", formData); // ✅ проверка

    const response = await extra.api.put<Profile>("/profile", formData);

    console.log("Response data:", response.data); // ✅ проверка

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
