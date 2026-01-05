import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { mockProducts } from '../data/mockProducts';

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

import { ShopService } from '../../../../services/shopService';

// Using local mock data to ensure Spanish content
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), // Dummy base url
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      queryFn: async () => {
        try {
          const products = await ShopService.getProducts();
          if (products.length === 0) {
            console.warn('No products in DB, falling back to mock data');
            return { data: mockProducts };
          }
          return { data: products };
        } catch (error) {
          console.error("API Error", error);
          return { data: mockProducts };
        }
      },
    }),
    getProductById: builder.query<Product, string>({
      queryFn: async (id) => {
        try {
           const product = await ShopService.getProductById(id);
           if (product) return { data: product };
           
           const mock = mockProducts.find(p => p.id === Number(id));
           return { data: mock || mockProducts[0] };
        } catch (error) {
           // If Firestore fails or product doesn't exist, return default mock
           console.error("Product fetch failed, using fallback:", error);
           return { data: mockProducts[0] };
        }
      },
    }),
    getCategories: builder.query<string[], void>({
       queryFn: async () => {
         try {
            // Optimally we would have a separate collection for categories
            const products = await ShopService.getProducts();
            const source = products.length > 0 ? products : mockProducts;
            const categories = Array.from(new Set(source.map(p => p.category)));
            return { data: categories };
         } catch(error) {
            console.error("Error fetching categories, using fallback:", error);
            const categories = Array.from(new Set(mockProducts.map(p => p.category)));
            return { data: categories };
         }
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetCategoriesQuery } = productsApi;
