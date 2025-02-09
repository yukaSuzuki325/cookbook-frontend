import { useState } from 'react';
import { useCreateRecipeMutation } from '../features/api/recipesApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
  });

  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  const [steps, setSteps] = useState(['']);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipe = {
      ...formData,
      ingredients,
      steps: steps.map((instruction, index) => ({
        stepNumber: index + 1,
        instruction,
      })),
    };

    console.log('Submitting recipe:', recipe);

    try {
      await createRecipe(recipe).unwrap();
      toast.success('Recipe created successfully!');
      navigate('/recipes/my-recipes');
    } catch (error) {
      console.error('Error creating recipe:', error);
      toast.error(error?.data?.message || 'Failed to create recipe');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
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
          <label className="block text-gray-700">
            Ingredients (name and quantity)
          </label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2 mb-2">
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
          <button
            type="button"
            onClick={addIngredient}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Ingredient
          </button>
        </div>
        <div>
          <label className="block text-gray-700">Steps</label>
          {steps.map((step, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder={`Step ${index + 1}`}
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addStep}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Step
          </button>
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
        <div>
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Add Recipe'}
        </button>
      </form>
    </div>
  );
};

export default AddRecipePage;
