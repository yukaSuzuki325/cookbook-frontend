import { useGetBookmarkedRecipesQuery } from '../features/api/recipesApiSlice.ts';
import RecipeCard from '../components/RecipeCard';
import LoadingPage from '../components/LoadingPage';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const BookmarkedRecipesPage = () => {
  const { state } = useLocation();
  const {
    data: recipes,
    isLoading,
    isError,
    refetch,
  } = useGetBookmarkedRecipesQuery();

  // Trigger refetch every time this page is visited and refetch has a new reference, making sure to show updated list of bookmarks
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <LoadingPage />;
  if (isError) return <p>Failed to fetch bookmarked recipes.</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Bookmarked Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.length > 0 ? (
          recipes.map((recipe) => <RecipeCard key={recipe._id} {...recipe} />)
        ) : (
          <p className="text-lg text-gray-700 mb-4">
            You have not bookmarked any recipes yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookmarkedRecipesPage;
