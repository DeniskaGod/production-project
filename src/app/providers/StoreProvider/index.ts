import StoreProvider from "./ui/StoreProvider";
import { createReduxStore, AppDispatch } from "./config/store";
import type { StateSchema, ReduxStoreWithManager} from "./config/StateSchema";
export {
    StoreProvider,
    createReduxStore
};

export type { StateSchema, ReduxStoreWithManager, AppDispatch };