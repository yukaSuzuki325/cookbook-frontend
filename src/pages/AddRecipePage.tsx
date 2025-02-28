import { useState } from 'react';
import { useCreateRecipeMutation } from '../features/api/recipesApiSlice.ts';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm.tsx';
import { handleRecipeSubmit } from '../utils/recipeHelpers.js';

const AddRecipePage = () => {
  const [createRecipe, { isLoading }] = useCreateRecipeMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cookingTime: 0,
    servings: 0,
    category: '',
    imageUrl: '',
    steps: '',
  });

  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleRecipeSubmit({
      formData,
      ingredients,
      action: createRecipe,
      navigate,
    });
  };

  return (
    <RecipeForm
      pageTitle="Add New Recipe"
      formData={formData}
      setFormData={setFormData}
      ingredients={ingredients}
      setIngredients={setIngredients}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      buttonText="Add Recipe"
    />
  );
};

export default AddRecipePage;
