import { useSelector } from 'react-redux';
import { useGetUserRecipesQuery } from '../features/api/recipesApiSlice';
import LoadingPage from '../components/LoadingPage';
import RecipeCard from '../components/RecipeCard';

const MyRecipesPage = () => {
  const { userInfo } = useSelector((store) => store.auth);
  const { _id: userId } = userInfo;
  const { data: recipes, isLoading, isError } = useGetUserRecipesQuery(userId);

  console.log(recipes);

  if (isLoading) return <LoadingPage />;
  if (isError) return <p>Error fetching your recipes</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              title={recipe.title}
              imageUrl={recipe.imageUrl}
              category={recipe.category}
              id={recipe._id}
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
