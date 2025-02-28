import { toast } from 'react-toastify';

export const handleRecipeSubmit = async ({
  formData,
  ingredients,
  recipeId,
  action, // createRecipe or updateRecipe mutation
  navigate,
}) => {
  console.log('handle');
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
    ...formData,
    ingredients,
    steps: stepsArray,
  };

  // Include recipeId only for editing
  if (recipeId) {
    recipeData.id = recipeId;
  }

  try {
    await action(recipeData).unwrap();

    toast.success(
      recipeId ? 'Recipe updated successfully!' : 'Recipe added successfully!'
    );

    if (recipeId) {
      navigate(`/recipes/${recipeId}`, { state: { refetch: true } });
    } else {
      navigate('/recipes/my-recipes');
    }
  } catch (error) {
    console.error('Error occurred:', error);
    toast.error(
      error?.data?.message || recipeId
        ? 'Failed to create recipe'
        : 'Failed to create recipe'
    );
  }
};
