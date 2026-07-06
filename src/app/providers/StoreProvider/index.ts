import StoreProvider from "./ui/StoreProvider";
import { createReduxStore, AppDispatch } from "./config/store";
import type { StateSchema, ReduxStoreWithManager, ThunkExtraArg, ThunkConfig} from "./config/StateSchema";
export {
    StoreProvider,
    createReduxStore
};

export type { StateSchema, ReduxStoreWithManager, AppDispatch, ThunkExtraArg, ThunkConfig };