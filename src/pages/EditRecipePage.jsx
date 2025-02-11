import { useState, useEffect } from 'react';
import {
  useUpdateRecipeMutation,
  useGetRecipeByIdQuery,
} from '../features/api/recipesApiSlice';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingPage from '../components/LoadingPage';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

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
        steps: recipe.steps.map((step) => step.instruction).join('\n'),
      });
      setIngredients(recipe.ingredients);
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, field, value) => {
    let updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      id: recipeId,
      ...formData,
      ingredients,
      steps: formData.steps.split('\n').map((instruction, index) => ({
        stepNumber: index + 1,
        instruction,
      })),
    };

    console.log('Recipe data being sent:', recipeData);

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
      <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>
      <div className="container mx-auto">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 md:border rounded py-4 md:px-4 lg:p-10"
        >
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Ingredients</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex flex-wrap gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, 'name', e.target.value)
                  }
                  className="flex-1 border border-gray-300 rounded p-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, 'quantity', e.target.value)
                  }
                  className="flex-1 border border-gray-300 rounded p-2"
                  required
                />
              </div>
            ))}
            <div className="flex flex-row-reverse">
              <button
                type="button"
                onClick={addIngredient}
                className="flex items-center justify-center w-10 h-10 bg-white text-orange-500 border border-gray-200 rounded hover:border-orange-400"
              >
                <FiPlus size={20} />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Steps (one per line)</label>
            <textarea
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">
              Cooking Time (in minutes)
            </label>
            <input
              type="number"
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Servings</label>
            <input
              type="number"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="">Select category</option>
              <option value="Meat">Meat</option>
              <option value="Fish">Fish</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update Recipe'}
          </button>
        </form>
      </div>
    </>
  );
};
export default EditRecipePage;
