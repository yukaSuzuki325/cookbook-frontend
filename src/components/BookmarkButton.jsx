import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useBookmarkRecipeMutation,
  useCheckIfBookmarkedQuery,
} from '../features/api/recipesApiSlice.ts';
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa6';

const BookmarkButton = ({ recipe }) => {
  const { userInfo } = useSelector((store) => store.auth);
  const { _id: recipeId } = recipe;

  const [bookmarkRecipe, { isLoading: isMutating }] =
    useBookmarkRecipeMutation();
  const {
    data: bookmarkStatus,
    isLoading,
    refetch,
  } = useCheckIfBookmarkedQuery(recipeId);

  const navigate = useNavigate();

  const handleBookmarkClick = async () => {
    if (!userInfo) {
      toast.error('Please sign in');
      navigate('/login');
      return;
    }

    try {
      const res = await bookmarkRecipe({ recipeId }).unwrap();
      toast.success(res.message); // Message comes from backend: "Bookmark added/removed successfully."
      refetch(); // Refetch bookmark status to update UI
    } catch (error) {
      console.error('Error bookmarking recipe:', error);
      toast.error(error?.data?.message || 'Failed to bookmark recipe.');
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <button
      className="p-2 bg-gray-100 rounded-full shadow-md hover:shadow-lg"
      onClick={handleBookmarkClick}
      disabled={isMutating} // Disable while mutating
    >
      <FaHeart
        className={`text-lg ${
          bookmarkStatus?.bookmarked ? 'text-red-400' : 'text-gray-400'
        }`}
      />
    </button>
  );
};

export default BookmarkButton;
