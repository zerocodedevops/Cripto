import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	persistReducer,
	persistStore,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { productsApi } from "../services/productsApi";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice"; // Added wishlistReducer import

const persistConfig = {
	key: "cart",
	storage,
	whitelist: ["items"], // Only persist items, not isOpen state
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
	reducer: {
		cart: persistedCartReducer,
		auth: authReducer,
		wishlist: wishlistReducer, // Added wishlist reducer
		[productsApi.reducerPath]: productsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(productsApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
