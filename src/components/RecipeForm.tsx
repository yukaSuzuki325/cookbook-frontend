import { FiPlus } from 'react-icons/fi';
import IconButton from './IconButton.tsx';
import FormInput from './FormInput.tsx';

interface Ingredient {
  name: string;
  quantity: string;
}

interface RecipeFormProps {
  pageTitle: string;
  formData: {
    title: string;
    description: string;
    cookingTime: number;
    servings: number;
    category: string;
    imageUrl: string;
    steps: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<RecipeFormProps['formData']>
  >;
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  buttonText: string;
}

const RecipeForm = ({
  pageTitle,
  formData,
  setFormData,
  ingredients,
  setIngredients,
  handleSubmit,
  isLoading,
  buttonText,
}: RecipeFormProps) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string
  ) => {
    let updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const labelClass = 'block text-gray-700';
  const inputClass = 'w-full border border-gray-300 rounded p-2';
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{pageTitle}</h1>
      <div className="container mx-auto">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 md:border rounded py-4 md:px-4 lg:p-10"
        >
          <FormInput
            label="Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required={true}
          />

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Ingredients</label>
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
              <IconButton
                icon={
                  <FiPlus
                    size={20}
                    onClick={addIngredient}
                    ariaLabel="Add ingredient"
                  />
                }
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Steps (one per line)</label>
            <textarea
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <FormInput
            label="Cooking Time (in minutes)"
            type="number"
            name="cookingTime"
            value={formData.cookingTime}
            onChange={handleChange}
            required={true}
          />
          <FormInput
            label="Servings"
            type="number"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            required={true}
          />

          <div>
            <label className={labelClass}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select category</option>
              {[
                { name: 'Meat' },
                { name: 'Fish' },
                { name: 'Vegetarian' },
                { name: 'Vegan' },
              ].map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <FormInput
            type="text"
            label="Image URL (optional)"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : buttonText}
          </button>
        </form>
      </div>
    </>
  );
};
export default RecipeForm;
