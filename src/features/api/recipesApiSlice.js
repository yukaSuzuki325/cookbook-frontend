import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recipesApiSlice = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/recipes`,
    credentials: 'include', // Ensure cookies are sent with requests
  }),

  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: () => '/',
    }),
    getRecipeById: builder.query({
      query: (id) => `/${id}`,
    }),
    bookmarkRecipe: builder.mutation({
      query: ({ recipeId }) => ({
        url: `/${recipeId}/bookmark`,
        method: 'POST',
      }),
    }),
    checkIfBookmarked: builder.query({
      query: (id) => `/${id}/bookmarked`,
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useBookmarkRecipeMutation,
  useCheckIfBookmarkedQuery,
} = recipesApiSlice;
