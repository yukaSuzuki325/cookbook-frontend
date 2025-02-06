import { useState } from 'react';
import { useGetRecipesQuery } from '../features/api/apiSlice';
import { BiSearch } from 'react-icons/bi';
import { FaLeaf, FaFish, FaCarrot, FaDrumstickBite } from 'react-icons/fa';
import LoadingPage from '../components/LoadingPage';
import RecipeCard from '../components/RecipeCard';

const HomePage = () => {
  const { data: recipes = [], isLoading, isError } = useGetRecipesQuery();
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter recipes by category and search query
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = category === 'All' || recipe.category === category;
    const matchesSearchQuery = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

  if (isLoading) return <LoadingPage />;
  if (isError) return <div>Error fetching recipes.</div>;

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-3xl">
          <input
            type="text"
            placeholder="Search for a recipe..."
            className="w-full py-3 pl-12 pr-4 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <BiSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 text-xl" />
        </div>
      </div>

      {/* Category Icons */}
      <div className="flex justify-around mb-8">
        <button
          className={`flex flex-col items-center text-gray-600 ${
            category === 'Vegan' ? 'text-blue-500' : ''
          }`}
          onClick={() => setCategory('Vegan')}
        >
          <FaLeaf className="text-3xl mb-2" />
          Vegan
        </button>
        <button
          className={`flex flex-col items-center text-gray-600 ${
            category === 'Vegetarian' ? 'text-blue-500' : ''
          }`}
          onClick={() => setCategory('Vegetarian')}
        >
          <FaCarrot className="text-3xl mb-2" />
          Vegetarian
        </button>
        <button
          className={`flex flex-col items-center text-gray-600 ${
            category === 'Fish' ? 'text-blue-500' : ''
          }`}
          onClick={() => setCategory('Fish')}
        >
          <FaFish className="text-3xl mb-2" />
          Fish
        </button>
        <button
          className={`flex flex-col items-center text-gray-600 ${
            category === 'Meat' ? 'text-blue-500' : ''
          }`}
          onClick={() => setCategory('Meat')}
        >
          <FaDrumstickBite className="text-3xl mb-2" />
          Meat
        </button>
      </div>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            category={recipe.category}
            imageUrl={recipe.imageUrl}
            id={recipe._id}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
