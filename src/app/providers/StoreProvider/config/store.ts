import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { counterReducer } from "@/entities/Counter";
import { userReducer } from "@/entities/User";
import { createReducerManager } from "./reducerManager";
import { $api } from "@/shared/api/api";
import { CombinedState } from "@reduxjs/toolkit";
import { uiReducer } from "@/features/UI";

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers = {
    counter: counterReducer,
    user: userReducer,
    ui: uiReducer,
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
      }),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
