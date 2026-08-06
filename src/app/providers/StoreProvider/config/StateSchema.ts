import { ArticleDetailsSchema } from "@/entities/Article/model/types/articleDetailsSchema";
import { CounterSchema } from "@/entities/Counter";
import { ProfileSchema } from "@/entities/Profile/model/types/profile";
import { UserSchema } from "@/entities/User";
import { AddCommentFormSchema } from "@/features/addCommentForm";
import { LoginSchema } from "@/features/AuthByUsername";
import { UISchema } from "@/features/UI";
import { ArticleDetailsPageSchema } from "@/pages/ArticleDetailsPage/model/types";
import { ArticlesPageSchema } from "@/pages/ArticlesPage";
import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { NavigateFunction } from "react-router-dom";

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  ui: UISchema;

  // async reducers
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  addCommentForm?: AddCommentFormSchema;
  articlesPage: ArticlesPageSchema;
  articleDetailsPage?: ArticleDetailsPageSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;
export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  // true = already mounted, false = not mounted
  getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager; // ← было replaceReducer, исправлено на reducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance;
  navigate: NavigateFunction;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
}
