import { useParams, useLocation } from 'react-router-dom';
import { useGetRecipeByIdQuery } from '../features/api/recipesApiSlice.ts';
import LoadingPage from '../components/LoadingPage.tsx';
import { FaClock, FaUsers } from 'react-icons/fa';
import { BiSolidCategory } from 'react-icons/bi';
import { useEffect } from 'react';
import BookmarkButton from '../components/BookmarkButton.tsx';
import ShareButton from '../components/ShareButton';

const RecipePage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const {
    data: recipe,
    isLoading,
    isError,
    refetch,
  } = useGetRecipeByIdQuery(id);

  useEffect(() => {
    if (state?.refetch) {
      refetch();
    }
  }, [state, refetch]);

  if (isLoading) return <LoadingPage />;
  if (isError || !recipe) return <div>Error fetching recipe.</div>;

  // Destructure recipe only after ensuring it exists
  const {
    imageUrl,
    title,
    description,
    ingredients,
    steps,
    servings,
    category,
    cookingTime,
  } = recipe;

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg w-full">
        {/* Title and Interactive Icons */}
        <div className="flex justify-between items-center mb-4 flex-wrap">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className="flex gap-4">
            <ShareButton title={title} id={id} />
            <BookmarkButton recipeId={recipe._id} />
          </div>
        </div>

        {/* Image and Description */}
        <div className="flex justify-between flex-wrap">
          <img
            src={imageUrl}
            alt={title}
            className="w-full lg:w-3/5 h-80 object-cover rounded-lg md:mb-4"
          />
          <div className="max-w-md mb-4">
            <p className="text-lg text-gray-700 mb-4">{description}</p>
            <div className="flex gap-6 items-center">
              <p className="flex items-center text-gray-600">
                <FaUsers className="text-gray-500 text-lg mr-2" /> Serves{' '}
                {servings}
              </p>
              <p className="flex items-center text-gray-600">
                <FaClock className="text-gray-500 text-lg mr-2" /> {cookingTime}{' '}
                minutes
              </p>
              <p className="flex items-center text-gray-600">
                <BiSolidCategory className="text-gray-500 text-lg mr-2" />{' '}
                {category}
              </p>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <h2 className="text-xl font-bold mb-2 mt-4">Ingredients</h2>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name} x {ingredient.quantity}
            </li>
          ))}
        </ul>

        {/* Steps */}
        <h2 className="text-xl font-bold mb-2 mt-4">Steps</h2>
        <ol className="list-decimal pl-6">
          {steps.map((step, index) => (
            <li key={index}>{step.instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};
export default RecipePage;
