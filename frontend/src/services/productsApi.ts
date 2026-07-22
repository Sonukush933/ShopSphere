import { api } from "./api";
import type { ProductsResponse } from "../types/product.types";

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, void>({
      query: () => "/products",
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;