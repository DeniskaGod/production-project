import { ReduxStoreWithManager } from "@/app/providers/StoreProvider";
import { StateSchemaKey } from "@/app/providers/StoreProvider/config/StateSchema";
import { Reducer } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
};

type ReducersListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
  children: React.ReactNode;
  reducers: ReducersList;
}

export default function DynamicModuleLoader({
  children,
  reducers,
}: DynamicModuleLoaderProps) {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    //  3. Проверяем что reducerManager существует
    if (store.reducerManager) {
      Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
        store.reducerManager.add(name, reducer);
        dispatch({ type: "@INIT ${name} reducer" });
      });
    }

    return () => {
      if (store.reducerManager) {
        Object.entries(reducers).forEach(
          ([name]: ReducersListEntry) => {
            store.reducerManager.remove(name);
            dispatch({ type: "@DESTROY ${name} reducer" });
          },
        );
      }
    };
  }, []); //  4. Добавляем store в зависимости
  return <>{children}</>;
}
