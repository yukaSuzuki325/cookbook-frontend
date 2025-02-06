import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/' }),
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: () => 'recipes',
    }),
    getRecipeById: builder.query({
      query: (id) => `recipes/${id}`,
    }),
  }),
});

export const { useGetRecipesQuery, useGetRecipeByIdQuery } = apiSlice;
