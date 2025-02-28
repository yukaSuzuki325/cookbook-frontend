import React, { useState, useEffect } from 'react';
import {
  useUpdateRecipeMutation,
  useGetRecipeByIdQuery,
} from '../features/api/recipesApiSlice.ts';
import { useParams, useNavigate } from 'react-router-dom';
import { handleRecipeSubmit } from '../utils/recipeHelpers.js';
import LoadingPage from '../components/LoadingPage.tsx';
import RecipeForm from '../components/RecipeForm.tsx';

const EditRecipePage = () => {
  const { id } = useParams();
  const recipeId = id ?? '';
  const { data: recipe, isLoading, isError } = useGetRecipeByIdQuery(recipeId);
  const [updateRecipe, { isLoading: isUpdating }] = useUpdateRecipeMutation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cookingTime: 0,
    servings: 0,
    category: '',
    steps: '',
    imageUrl: '',
  });

  const [ingredients, setIngredients] = useState([
    {
      name: '',
      quantity: '',
    },
  ]);

  //Update formData value with the fetched recipe data, only the data becomes available
  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title,
        description: recipe.description,
        cookingTime: recipe.cookingTime,
        servings: recipe.servings,
        category: recipe.category,
        imageUrl: recipe.imageUrl,
        steps: recipe.steps.map((step) => step.instruction).join('\n'),
      });
      setIngredients(recipe.ingredients);
    }
  }, [recipe]);

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
