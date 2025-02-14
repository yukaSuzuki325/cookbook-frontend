import { useState } from 'react';
import { useCreateRecipeMutation } from '../features/api/recipesApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';

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
    if (!formData.imageUrl) {
      formData.imageUrl =
        'https://res.cloudinary.com/dcklvu8tf/image/upload/v1739442214/cookbook/spices.jpg';
    }

    //Convert steps into array
    const stepsArray = formData.steps.split('\n').map((instruction, index) => ({
      stepNumber: index + 1,
      instruction: instruction.trim(),
    }));

    try {
      await createRecipe({
        ...formData,
        ingredients,
        steps: stepsArray,
      }).unwrap();
      toast.success('Recipe created successfully!');
      navigate('/recipes/my-recipes');
    } catch (error) {
      console.error('Error creating recipe:', error);
      toast.error(error?.data?.message || 'Failed to create recipe');
    }
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
