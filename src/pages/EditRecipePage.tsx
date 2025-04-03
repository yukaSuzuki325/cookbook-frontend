import React, { useState, useEffect } from 'react';
import {
  useUpdateRecipeMutation,
  useGetRecipeByIdQuery,
} from '../features/api/recipesApiSlice.ts';
import { useParams, useNavigate } from 'react-router-dom';
import { handleRecipeSubmit } from '../utils/recipeHelpers.ts';
import LoadingPage from '../components/LoadingPage.tsx';
import RecipeForm, { type RecipeFormData } from '../components/RecipeForm.tsx';

const EditRecipePage = () => {
  // Get the recipe ID from the URL parameters
  const { id } = useParams();
  const recipeId = id ?? '';

  // Fetch the existing recipe data by ID
  const { data: recipe, isLoading, isError } = useGetRecipeByIdQuery(recipeId);

  // Set up mutation hook for updating a recipe
  const [updateRecipe, { isLoading: isUpdating }] = useUpdateRecipeMutation();

  const navigate = useNavigate();

  // State for main recipe fields
  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    description: '',
    cookingTime: 0,
    servings: 0,
    category: '',
    steps: '',
    imageUrl: '',
  });

  // State for the ingredients list
  const [ingredients, setIngredients] = useState([
    {
      name: '',
      quantity: '',
    },
  ]);

  // When the recipe data has been fetched, populate the form and ingredients states
  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title,
        description: recipe.description,
        cookingTime: recipe.cookingTime,
        servings: recipe.servings,
        category: recipe.category,
        imageUrl: recipe.imageUrl,
        // Convert array of step objects into a single string separated by newlines
        steps: recipe.steps.map((step) => step.instruction).join('\n'),
      });
      // Set ingredients directly from fetched recipe
      setIngredients(recipe.ingredients);
    }
  }, [recipe]);

  // Handle the form submission for updating the recipe
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleRecipeSubmit({
      formData,
      ingredients,
      recipeId,
      action: updateRecipe,
      navigate,
    });
  };

  if (isLoading) return <LoadingPage />;
  if (isError)
    return (
      <h1 className="text-center text-2xl font-bold mt-10">Recipe not found</h1>
    );

  return (
    <>
      <RecipeForm
        pageTitle="Edit Recipe"
        formData={formData}
        setFormData={setFormData}
        ingredients={ingredients}
        setIngredients={setIngredients}
        handleSubmit={handleSubmit}
        isLoading={isUpdating}
        buttonText="Update Recipe"
      />
    </>
  );
};
export default EditRecipePage;
