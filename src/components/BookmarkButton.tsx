import { useAuthSelector } from '../features/auth/hooks.ts';
import { useNavigate } from 'react-router-dom';
import {
  useBookmarkRecipeMutation,
  useCheckIfBookmarkedQuery,
} from '../features/api/recipesApiSlice.ts';
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa6';
import { type ApiError } from '../types/apiTypes.ts';

interface BookmarkButtonProps {
  recipeId: string;
}

const BookmarkButton = ({ recipeId }: BookmarkButtonProps) => {
  const { userInfo } = useAuthSelector((store) => store.auth);

  // Set up bookmark mutation and bookmark status query
  const [bookmarkRecipe, { isLoading: isMutating }] =
    useBookmarkRecipeMutation();
  const {
    data: bookmarkStatus,
    isLoading,
    refetch,
  } = useCheckIfBookmarkedQuery(recipeId);

  const navigate = useNavigate();

  // Handle click event for the bookmark button
  const handleBookmarkClick = async () => {
    // Redirect unauthenticated users to login
    if (!userInfo) {
      toast.error('Please sign in');
      navigate('/login');
      return;
    }

    try {
      // Attempt to toggle bookmark status
      const res = await bookmarkRecipe({ recipeId }).unwrap();
      // Show success message and refetch bookmark status to update icon
      toast.success(res.message);
      refetch();
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(
        error.data?.message || error.error || 'An unknown error occurred'
      );
    }
  };

  // Show loading text while checking bookmark status
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
