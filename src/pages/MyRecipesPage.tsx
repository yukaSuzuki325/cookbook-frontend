import { useAuthSelector } from '../features/auth/hooks.ts';
import { useGetUserRecipesQuery } from '../features/api/recipesApiSlice.ts';
import LoadingPage from '../components/LoadingPage.tsx';
import RecipeCard from '../components/RecipeCard.tsx';
import { useEffect } from 'react';

const MyRecipesPage = () => {
  const { userInfo } = useAuthSelector((store) => store.auth);

  if (!userInfo) {
    return <p>You must be logged in to view your recipes.</p>;
  }
  const { _id: userId } = userInfo;
  const {
    data: recipes = [],
    isLoading,
    isError,
    refetch,
    error,
  } = useGetUserRecipesQuery(userId);

  useEffect(() => {
    if (isError) {
      throw error;
    }
  }, [isError, error]);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              {...recipe}
              showActions={true}
              onRecipeDeleted={refetch}
            />
          ))
        ) : (
          <p>You have not created any recipes yet.</p>
        )}
      </div>
    </div>
  );
};
export default MyRecipesPage;
