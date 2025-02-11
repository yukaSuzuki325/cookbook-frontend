import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:8080/api'
    : 'https://cookbook-backend-5yyk.onrender.com/api';

console.log(BASE_URL);

export const recipesApiSlice = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/recipes`,
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
    getUserRecipes: builder.query({
      query: (userId) => `/user/${userId}`,
    }),
    getBookmarkedRecipes: builder.query({
      query: () => '/bookmarked',
    }),
    deleteRecipe: builder.mutation({
      query: (recipeId) => ({
        url: `/${recipeId}`,
        method: 'DELETE',
      }),
    }),
    createRecipe: builder.mutation({
      query: (recipe) => ({
        url: '/',
        method: 'POST',
        body: recipe,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    updateRecipe: builder.mutation({
      query: ({ id, ...recipe }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: recipe,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useBookmarkRecipeMutation,
  useCheckIfBookmarkedQuery,
  useGetUserRecipesQuery,
  useGetBookmarkedRecipesQuery,
  useDeleteRecipeMutation,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
} = recipesApiSlice;
