import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface WishlistItem {
	id: number;
}

interface WishlistState {
	items: number[]; // Store only IDs
}

const initialState: WishlistState = {
	items: JSON.parse(localStorage.getItem("ecommerce_wishlist") || "[]"),
};

export const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,
	reducers: {
		toggleWishlist: (state, action: PayloadAction<number>) => {
			const id = action.payload;
			const index = state.items.indexOf(id);
			if (index >= 0) {
				state.items.splice(index, 1);
			} else {
				state.items.push(id);
			}
			localStorage.setItem("ecommerce_wishlist", JSON.stringify(state.items));
		},
		setWishlist: (state, action: PayloadAction<number[]>) => {
			state.items = action.payload;
			localStorage.setItem("ecommerce_wishlist", JSON.stringify(state.items));
		},
	},
});

export const { toggleWishlist, setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
