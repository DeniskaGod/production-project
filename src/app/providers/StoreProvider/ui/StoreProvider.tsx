import React from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../config/store";
import { StateSchema } from "../config/StateSchema";
import { useNavigate } from "react-router-dom";

interface StoreProviderProps {
  children?: React.ReactNode;
  initialState?: StateSchema;
}

export default function StoreProvider({
  children,
  initialState,
}: StoreProviderProps) {
  // const navigate = useNavigate();

  const store = createReduxStore(
    initialState,
    // navigate
  );

  return <Provider store={store}>{children}</Provider>;
}
