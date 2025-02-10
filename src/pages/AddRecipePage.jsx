import { useState } from 'react';
import { useCreateRecipeMutation } from '../features/api/recipesApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.steps);

    // Convert steps into array
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
    <div className="container mx-auto lg:w-3/5">
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
          <label className="block text-gray-700">Ingredients</label>
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
          <div className="flex flex-row-reverse">
            <button
              type="button"
              onClick={addIngredient}
              className="flex items-center justify-center w-10 h-10 bg-white text-orange-500 border border-gray-300 rounded hover:border-orange-400"
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
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Add Recipe'}
        </button>
      </form>
    </div>
  );
};

export default AddRecipePage;
