
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import cartReducer from "./slices/cartSlice"



const persistConfig = {
  key: "cart",
  storage,
};


const rootReducer = combineReducers({
  cart: cartReducer,
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});


export const persistor = persistStore(store);