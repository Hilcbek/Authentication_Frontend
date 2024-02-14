import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"
import userSlice from "./userSlice";
let rootReducer = combineReducers({ user: userSlice });

let persistConfig = {
  key: "root",
  version: 1,
  storage,
};

let persistReducers = persistReducer(persistConfig, rootReducer);

export let store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
