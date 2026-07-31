import { ReduxStoreWithManager } from "@/app/providers/StoreProvider";
import { StateSchemaKey } from "@/app/providers/StoreProvider/config/StateSchema";
import { Reducer } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
};

interface DynamicModuleLoaderProps {
  children: React.ReactNode;
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
}

export default function DynamicModuleLoader({
  children,
  reducers,
  removeAfterUnmount = true,
}: DynamicModuleLoaderProps) {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();

    if (store.reducerManager) {
      Object.entries(reducers).forEach(([name, reducer]) => {
        const mounted = mountedReducers[name as StateSchemaKey];
        if (!mounted) {
          store.reducerManager.add(name as StateSchemaKey, reducer);
          dispatch({ type: `@INIT ${name} reducer` });
        }
      });
    }

    if (removeAfterUnmount) {
      return () => {
        if (store.reducerManager) {
          Object.entries(reducers).forEach(([name]) => {
            store.reducerManager.remove(name as StateSchemaKey);
            dispatch({ type: `@DESTROY ${name} reducer` });
          });
        }
      };
    }
  }, [dispatch, reducers, store.reducerManager, removeAfterUnmount]);

  return <>{children}</>;
}
