import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authSlice from "../auth/authSlice";
import movieApiSlice from "../Thunk/authThunk";

const persistConfig = {
    key: "root",
    storage
};

const rootReducer = combineReducers({
    auth: authSlice,
    api: movieApiSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);
export default store;
