import { FiPlus } from 'react-icons/fi';
import IconButton from './IconButton.tsx';
import FormInput from './FormInput.tsx';
import ActionButton from './ActionButton.tsx';
import { IngredientWithoutId, RecipeFormData } from '../types/recipeTypes.ts';

interface RecipeFormProps {
  pageTitle: string;
  formData: RecipeFormData;
  setFormData: React.Dispatch<
    React.SetStateAction<RecipeFormProps['formData']>
  >;
  ingredients: IngredientWithoutId[];
  setIngredients: React.Dispatch<React.SetStateAction<IngredientWithoutId[]>>;
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
    field: keyof IngredientWithoutId,
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
                icon={<FiPlus size={20} />}
                onClick={addIngredient}
                ariaLabel="Add ingredient"
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Steps (one per line)</label>
            <textarea
              name="steps"
              value={
                Array.isArray(formData.steps)
                  ? formData.steps.map((step) => step.instruction).join('\n') // Convert array to string
                  : formData.steps
              }
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
            value={formData.imageUrl ?? ''}
            onChange={handleChange}
          />

          <ActionButton isLoading={isLoading} buttonText={buttonText} />
        </form>
      </div>
    </>
  );
};
export default RecipeForm;
