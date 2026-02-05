import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";

export interface CartItem {
	id: number;
	title: string;
	price: number;
	image: string;
	quantity: number;
	size?: string;
}

export interface CartState {
	items: CartItem[];
	isOpen: boolean;
	status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: CartState = {
	items: JSON.parse(localStorage.getItem("ecommerce_cart") || "[]"),
	isOpen: false,
	status: "idle",
};

// Async Thunk for Cloud Sync
export const syncCartWithCloud = createAsyncThunk(
	"cart/syncWithCloud",
	async (username: string, { getState }) => {
		try {
			// 1. Get Local Cart
			const state = getState() as any;
			const localItems: CartItem[] = state.cart.items;

			if (!username) return localItems;

			// If DB is mocked (empty object), simulated delay and return local
			if (!db.type && !("app" in db)) {
				// rudimentary check if real Firestore instance
				console.log("Using Mock Cloud Sync");
				await new Promise((resolve) => setTimeout(resolve, 800));
				return localItems;
			}

			const cartRef = doc(db, "carts", username);
			const cartSnap = await getDoc(cartRef);

			let mergedItems = [...localItems];

			if (cartSnap.exists()) {
				const cloudItems = cartSnap.data().items as CartItem[];
				// Simple merge strategy: Cloud items overwrite local if conflict, or add if new
				// For a real app, logic might be more complex (sum quantities)

				// Let's implement Sum Quantities strategy
				const itemMap = new Map();

				[...localItems, ...cloudItems].forEach((item) => {
					const key = `${item.id}-${item.size || ""}`;
					if (itemMap.has(key)) {
						const existing = itemMap.get(key);
						existing.quantity = Math.max(existing.quantity, item.quantity); // Take max or sum
					} else {
						itemMap.set(key, { ...item });
					}
				});

				mergedItems = Array.from(itemMap.values());
			}

			// 3. Write back merged state
			await setDoc(cartRef, {
				items: mergedItems,
				lastSynced: new Date().toISOString(),
			});

			return mergedItems;
		} catch (error) {
			console.error("Cart Sync Error:", error);
			throw error;
		}
	},
);

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
			const { id, size } = action.payload;
			const existing = state.items.find((i) => i.id === id && i.size === size);

			if (existing) {
				existing.quantity += 1;
			} else {
				state.items.push({ ...action.payload, quantity: 1 });
			}
			localStorage.setItem("ecommerce_cart", JSON.stringify(state.items));
		},
		removeFromCart: (
			state,
			action: PayloadAction<{ id: number; size?: string }>,
		) => {
			state.items = state.items.filter(
				(i) => !(i.id === action.payload.id && i.size === action.payload.size),
			);
			localStorage.setItem("ecommerce_cart", JSON.stringify(state.items));
		},
		updateQuantity: (
			state,
			action: PayloadAction<{ id: number; size?: string; quantity: number }>,
		) => {
			const item = state.items.find(
				(i) => i.id === action.payload.id && i.size === action.payload.size,
			);
			if (item) {
				item.quantity = Math.max(0, action.payload.quantity);
				if (item.quantity === 0) {
					state.items = state.items.filter(
						(i) =>
							!(i.id === action.payload.id && i.size === action.payload.size),
					);
				}
			}
			localStorage.setItem("ecommerce_cart", JSON.stringify(state.items));
		},
		clearCart: (state) => {
			state.items = [];
			localStorage.setItem("ecommerce_cart", "[]");
		},
		toggleCart: (state) => {
			state.isOpen = !state.isOpen;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(syncCartWithCloud.pending, (state) => {
				state.status = "loading";
			})
			.addCase(syncCartWithCloud.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.items = action.payload;
				localStorage.setItem("ecommerce_cart", JSON.stringify(state.items));
			})
			.addCase(syncCartWithCloud.rejected, (state) => {
				state.status = "failed";
			});
	},
});

export const {
	addToCart,
	removeFromCart,
	updateQuantity,
	clearCart,
	toggleCart,
} = cartSlice.actions;
export default cartSlice.reducer;
