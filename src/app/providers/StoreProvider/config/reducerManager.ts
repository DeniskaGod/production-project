import {
  AnyAction,
  combineReducers,
  ReducersMapObject,
  Reducer,
} from "@reduxjs/toolkit";
import {
  MountedReducers,
  ReducerManager,
  StateSchema,
  StateSchemaKey,
} from "./StateSchema";

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  let keysToRemove: StateSchemaKey[] = [];
  const mountedReducers: MountedReducers = {};

  return {
    getReducerMap: () => reducers,
    getMountedReducers: () => mountedReducers,
    reduce: (state: StateSchema | undefined, action: AnyAction) => {
      let newState = state;
      if (keysToRemove.length > 0 && newState) {
        newState = { ...newState };
        for (const key of keysToRemove) {
          delete newState[key];
        }
        keysToRemove = [];
      }
      // ✅ Приводим к правильному типу
      return combinedReducer(newState as any, action);
    },

    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }
      reducers[key] = reducer;
      mountedReducers[key] = true;
      combinedReducer = combineReducers(reducers);
    },

    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return;
      }
      delete reducers[key];
      mountedReducers[key] = false;
      keysToRemove.push(key);
      combinedReducer = combineReducers(reducers);
    },
  };
}
