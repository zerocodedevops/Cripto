import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
	username: string;
}

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	user: JSON.parse(localStorage.getItem("ecommerce_user") || "null"),
	isAuthenticated: !!localStorage.getItem("ecommerce_user"),
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			localStorage.setItem("ecommerce_user", JSON.stringify(action.payload));
		},
		logout: (state) => {
			state.user = null;
			state.isAuthenticated = false;
			localStorage.removeItem("ecommerce_user");
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
