import { toast } from 'react-toastify';
import {
  Ingredient,
  RecipeFormData,
  RecipeStep,
} from '../components/RecipeForm';
import { NavigateFunction } from 'react-router-dom';

type RecipeAction = (recipeData: any) => Promise<any>;

interface RecipeSubmitParams {
  formData: RecipeFormData;
  ingredients: Ingredient[];
  recipeId?: string;
  action: RecipeAction;
  navigate: NavigateFunction;
}

export const handleRecipeSubmit = async ({
  formData,
  ingredients,
  recipeId,
  action, // createRecipe or updateRecipe mutation
  navigate,
}: RecipeSubmitParams): Promise<void> => {
  if (!formData.imageUrl) {
    formData.imageUrl =
      'https://res.cloudinary.com/dcklvu8tf/image/upload/v1739442214/cookbook/spices.jpg';
  }

  //Convert steps into array
  const stepsArray: RecipeStep[] =
    typeof formData.steps === 'string'
      ? formData.steps
          .split('\n')
          .map((instruction: string, index: number) => ({
            stepNumber: index + 1,
            instruction: instruction.trim(),
          }))
      : formData.steps;

  const recipeData: RecipeFormData & { id?: string } & {
    ingredients: Ingredient[];
  } = {
    ...formData,
    ingredients,
    steps: stepsArray,
  };

  // Include recipeId only for editing
  if (recipeId) {
    recipeData.id = recipeId;
  }

  try {
    await (action(recipeData) as any).unwrap();

    toast.success(
      recipeId ? 'Recipe updated successfully!' : 'Recipe added successfully!'
    );

    if (recipeId) {
      navigate(`/recipes/${recipeId}`, { state: { refetch: true } });
    } else {
      navigate('/recipes/my-recipes');
    }
  } catch (error: any) {
    console.error('Error occurred:', error);
    toast.error(
      error?.data?.message ||
        (recipeId ? 'Failed to update recipe' : 'Failed to create recipe')
    );
  }
};
