import { useState } from 'react';
import { useCreateRecipeMutation } from '../features/api/recipesApiSlice';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import { handleRecipeSubmit } from '../utils/recipeHelpers';

const AddRecipePage = () => {
  const [createRecipe, { isLoading }] = useCreateRecipeMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cookingTime: '',
    servings: '',
    category: '',
    imageUrl: '',
    steps: '',
  });

  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);

  const handleSubmit = async (e) => {
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
