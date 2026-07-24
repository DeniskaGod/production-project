import { ThunkConfig } from "@/app/providers/StoreProvider";
import { getUserAuthData } from "@/entities/User";
import i18n from "@/shared/config/i18n/i18n";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Comment } from "@/entities/Comment";
import { getArticleDetailsData } from "@/entities/Article/model/selectors/articleDetails";
import { StateSchema } from "@/app/providers/StoreProvider";

export const addCommentForArticle = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
>("articleDetails/addCommentForArticle", async (text, thunkAPI) => {
  const { getState, rejectWithValue, extra } = thunkAPI;

  const state = getState() as StateSchema;

  const userData = getUserAuthData(state);
  const article = getArticleDetailsData(state);

  if (!userData || !text || !article) {
    return rejectWithValue("No user, text or article");
  }

  try {
    const response = await extra.api.post<Comment>("/comments", {
      articleId: article.id,
      userId: userData.id,
      text,
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue(i18n.t("Ошибка при отправке комментария"));
  }
});
