import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { counterReducer } from "@/entities/Counter";
import { userReducer } from "@/entities/User";
import { createReducerManager } from "./reducerManager";
import { $api } from "@/shared/api/api";
import { CombinedState } from "@reduxjs/toolkit";
import { uiReducer } from "@/features/UI";
import { rtkApi } from "@/shared/api/rtkApi"; // ✅ добавить

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers = {
    counter: counterReducer,
    user: userReducer,
    ui: uiReducer,
    [rtkApi.reducerPath]: rtkApi.reducer, // ✅ добавить
  } as ReducersMapObject<StateSchema>;

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce as (
      state: StateSchema | undefined,
      action: any,
    ) => CombinedState<StateSchema>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api: $api,
          },
        },
      }).concat(rtkApi.middleware), // ✅ добавить middleware
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];