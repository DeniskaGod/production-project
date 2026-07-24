// entities/Profile/model/services/updateProfileData/updateProfileData.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Profile, ValidateProfileError } from "../../types/profile";
import { StateSchema, ThunkConfig } from "@/app/providers/StoreProvider";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";
import { validateProfileData } from "../validateProfileData/validateProfileData";

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileError[]>
>("profile/updateProfileData", async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;

  try {
    const state = getState() as StateSchema;
    const formData = getProfileForm(state);

    const result = validateProfileData(formData);

    // validateProfileData returns { errors: ValidateProfileError[], valid: boolean }
    if (!result.valid) {
      return rejectWithValue(result.errors);
    }

    console.log("Sending formData:", formData); // ✅ проверка

    const response = await extra.api.put<Profile>(
      "/profile/" + formData?.id,
      formData,
    );

    console.log("Response data:", response.data); // ✅ проверка

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
  }
});
