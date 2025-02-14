import { useState, useEffect } from 'react';
import {
  useUpdateRecipeMutation,
  useGetRecipeByIdQuery,
} from '../features/api/recipesApiSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { handleRecipeSubmit } from '../utils/recipeHelpers';
import LoadingPage from '../components/LoadingPage';
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

  const handleSubmit = async (e) => {
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
