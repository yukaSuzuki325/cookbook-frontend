import { baseApi } from './baseApi';
import { type Recipe, type CreateRecipeRequest } from '../../types/recipeTypes';

export const recipesApiSlice = baseApi.injectEndpoints({
  //reducerPath: 'recipesApi',
  endpoints: (builder) => ({
    // ✅ Define the return type as an array of Recipe
    getRecipes: builder.query<Recipe[], void>({
      query: () => '/recipes',
    }),

    getRecipeById: builder.query<Recipe, string>({
      query: (id) => `/recipes/${id}`,
    }),

    bookmarkRecipe: builder.mutation<{ message: string }, { recipeId: string }>(
      {
        query: ({ recipeId }) => ({
          url: `/recipes/${recipeId}/bookmark`,
          method: 'POST',
        }),
      }
    ),

    checkIfBookmarked: builder.query<{ bookmarked: boolean }, string>({
      query: (id) => `/recipes/${id}/bookmarked`,
    }),

    getUserRecipes: builder.query<Recipe[], string>({
      query: (userId) => `/recipes/user/${userId}`,
    }),

    getBookmarkedRecipes: builder.query<Recipe[], void>({
      query: () => '/recipes/bookmarked',
    }),

    deleteRecipe: builder.mutation<{ message: string }, string>({
      query: (recipeId) => ({
        url: `/recipes/${recipeId}`,
        method: 'DELETE',
      }),
    }),

    createRecipe: builder.mutation<{ message: string }, CreateRecipeRequest>({
      query: (recipe) => ({
        url: '/recipes',
        method: 'POST',
        body: recipe,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    updateRecipe: builder.mutation<
      { message: string },
      Partial<Recipe> & { id: string }
    >({
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
