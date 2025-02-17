import { baseApi } from './baseApi';

export const recipesApiSlice = baseApi.injectEndpoints({
  reducerPath: 'recipesApi',
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: () => '/recipes',
    }),
    getRecipeById: builder.query({
      query: (id) => `/recipes/${id}`,
    }),
    bookmarkRecipe: builder.mutation({
      query: ({ recipeId }) => ({
        url: `/recipes/${recipeId}/bookmark`,
        method: 'POST',
      }),
    }),
    checkIfBookmarked: builder.query({
      query: (id) => `/recipes/${id}/bookmarked`,
    }),
    getUserRecipes: builder.query({
      query: (userId) => `/recipes/user/${userId}`,
    }),
    getBookmarkedRecipes: builder.query({
      query: () => '/recipes/bookmarked',
    }),
    deleteRecipe: builder.mutation({
      query: (recipeId) => ({
        url: `/recipes/${recipeId}`,
        method: 'DELETE',
      }),
    }),
    createRecipe: builder.mutation({
      query: (recipe) => ({
        url: '/recipes',
        method: 'POST',
        body: recipe,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    updateRecipe: builder.mutation({
      query: ({ id, ...recipe }) => ({
        url: `/recipes/${id}`,
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
