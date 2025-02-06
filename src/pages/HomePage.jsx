import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaLeaf, FaFish, FaCarrot, FaDrumstickBite } from 'react-icons/fa';

const HomePage = () => {
  const [category, setCategory] = useState('All');
  const recipes = [
    { id: 1, title: 'Vegan Salad', category: 'Vegan' },
    { id: 2, title: 'Grilled Salmon', category: 'Fish' },
    { id: 3, title: 'Chicken Curry', category: 'Meat' },
    { id: 4, title: 'Vegetarian Pizza', category: 'Vegetarian' },
    { id: 5, title: 'Fish Tacos', category: 'Fish' },
    { id: 6, title: 'Beef Stew', category: 'Meat' },
    { id: 7, title: 'Tofu Stir-Fry', category: 'Vegan' },
    { id: 8, title: 'Vegetable Soup', category: 'Vegetarian' },
  ];

  // Filter recipes by category
  const filteredRecipes =
    category === 'All'
      ? recipes
      : recipes.filter((r) => r.category === category);

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Search Bar */}
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-3xl">
          <input
            type="text"
            placeholder="Search for a recipe..."
            className="w-full py-3 pl-12 pr-4 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold">{recipe.title}</h3>
            <p className="text-sm text-gray-500">{recipe.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
