import { useState } from 'react';
import { useCreateRecipeMutation } from '../features/api/recipesApiSlice.ts';
import { useNavigate } from 'react-router-dom';
import RecipeForm, { RecipeFormData } from '../components/RecipeForm.tsx';
import { handleRecipeSubmit } from '../utils/recipeHelpers.ts';

const AddRecipePage = () => {
  // Set up the mutation hook for creating a recipe via the API
  const [createRecipe, { isLoading }] = useCreateRecipeMutation();

  // Hook to programmatically navigate users after form submission
  const navigate = useNavigate();

  // Initial state for the main recipe form fields
  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    description: '',
    cookingTime: 0,
    servings: 0,
    category: '',
    imageUrl: '',
    steps: '',
  });

  // State to manage the list of ingredients
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Delegate the actual submit logic to a helper function
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
