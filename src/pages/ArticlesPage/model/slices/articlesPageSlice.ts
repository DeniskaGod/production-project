import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";
import { Article } from "@/entities/Article";
import { StateSchema } from "@/app/providers/StoreProvider";
import { ArticlesPageSchema } from "../types/articlesPageSchema";
import { ArticleView } from "@/entities/Article/model/types/article";
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from "@/shared/const/localStorage";

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlesPageSlice = createSlice({
  name: "articlesPageSlice",
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    view: ArticleView.SMALL,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    initState: (state) => {
      state.view = localStorage.getItem(
        ARTICLES_VIEW_LOCALSTORAGE_KEY,
      ) as ArticleView;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchArticlesList.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.isLoading = false;
          articlesAdapter.setAll(state, action.payload);
        },
      )
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articlesPageReducer, actions: articlesPageActions } =
  articlesPageSlice;
