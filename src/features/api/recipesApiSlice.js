import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recipesApiSlice = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/recipes`,
  }),
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: () => '/',
    }),
    getRecipeById: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetRecipesQuery, useGetRecipeByIdQuery } = recipesApiSlice;
