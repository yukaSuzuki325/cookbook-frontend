import { useState } from 'react';
import { useGetRecipesQuery } from '../features/api/recipesApiSlice.ts';
import { BiSearch } from 'react-icons/bi';
import LoadingPage from '../components/LoadingPage.tsx';
import RecipeCard from '../components/RecipeCard.tsx';
import CategoryIcons from '../components/CategoryIcons.tsx';

const HomePage = () => {
  const { data: recipes = [], isLoading, isError } = useGetRecipesQuery();
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  console.log(recipes[0]);

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
    <div className="container mx-auto">
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

      <CategoryIcons category={category} setCategory={setCategory} />

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} {...recipe} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600 text-lg">
            No recipes found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
