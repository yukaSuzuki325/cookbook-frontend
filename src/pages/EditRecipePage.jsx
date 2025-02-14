import { useState, useEffect } from 'react';
import {
  useUpdateRecipeMutation,
  useGetRecipeByIdQuery,
} from '../features/api/recipesApiSlice';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingPage from '../components/LoadingPage';
import { toast } from 'react-toastify';
import RecipeForm from '../components/RecipeForm';

const EditRecipePage = () => {
  const { id: recipeId } = useParams();
  const { data: recipe, isLoading, isError } = useGetRecipeByIdQuery(recipeId);
  const [updateRecipe, { isLoading: isUpdating }] = useUpdateRecipeMutation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cookingTime: '',
    servings: '',
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

    const recipeData = {
      id: recipeId,
      ...formData,
      ingredients,
      steps: stepsArray,
    };

    try {
      await updateRecipe(recipeData).unwrap();
      toast.success('Recipe updated successfully!');
      //Refetch the recipe after navigating
      navigate(`/recipes/${recipeId}`, { state: { refetch: true } });
    } catch (error) {
      console.error('Error updating recipe:', error);
      toast.error(error?.data?.message || 'Failed to update recipe');
    }
  };

  if (isLoading) return <LoadingPage />;
  if (isError)
    return (
      <h1 className="text-center text-2xl font-bold mt-10">Recipe not found</h1>
    );

  console.log('recipe', recipe);

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
