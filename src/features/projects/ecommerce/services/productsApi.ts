import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Fuse from "fuse.js";
import { mockProducts } from "../data/mockProducts";

export interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
}

export interface ProductParams {
	page?: number;
	limit?: number;
	category?: string;
	search?: string;
	sort?: "price_asc" | "price_desc" | "newest";
}

import { ShopService } from "../../../../services/shopService";

// Initialize Fuzzy Search
const fuse = new Fuse(mockProducts, {
	keys: ["title", "description", "category"],
	threshold: 0.3, // Tolerance for typos
});

export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/" }),
	endpoints: (builder) => ({
		getProducts: builder.query<
			{ data: Product[]; total: number },
			ProductParams
		>({
			queryFn: async (params) => {
				try {
					// 1. Fetch Source (DB or Mock)
					let source = await ShopService.getProducts();
					if (source.length === 0) source = mockProducts;

					// 2. Filter by Category
					let filtered =
						params.category && params.category !== "all"
							? source.filter((p) => p.category === params.category)
							: source;

					// 3. Fuzzy Search
					if (params.search) {
						const fuseInstance = new Fuse(filtered, {
							keys: ["title", "description", "category"],
							threshold: 0.4,
						});
						filtered = fuseInstance.search(params.search).map((r) => r.item);
					}

					// 4. Sorting
					if (params.sort) {
						filtered.sort((a, b) => {
							if (params.sort === "price_asc") return a.price - b.price;
							if (params.sort === "price_desc") return b.price - a.price;
							return 0;
						});
					}

					// 5. Pagination
					const page = params.page || 1;
					const limit = params.limit || 8;
					const start = (page - 1) * limit;
					const paginated = filtered.slice(start, start + limit);

					return {
						data: {
							data: paginated,
							total: filtered.length,
						},
					};
				} catch (error) {
					console.error("API Error", error);
					return { data: { data: [], total: 0 } };
				}
			},
		}),
		getProductById: builder.query<Product, string>({
			queryFn: async (id) => {
				try {
					const product = await ShopService.getProductById(id);
					if (product) return { data: product };

					const mock = mockProducts.find((p) => p.id === Number(id));
					return { data: mock || mockProducts[0] };
				} catch (error) {
					// Log error for debugging but return safe fallback
					console.error("Failed to fetch product by ID", error);
					return { data: mockProducts[0] };
				}
			},
		}),
		getCategories: builder.query<string[], void>({
			queryFn: async () => {
				const products = mockProducts;
				const categories = Array.from(new Set(products.map((p) => p.category)));
				return { data: categories };
			},
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
	useGetCategoriesQuery,
} = productsApi;
