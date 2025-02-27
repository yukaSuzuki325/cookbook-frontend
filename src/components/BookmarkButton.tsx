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

  console.log(recipeId);

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
      toast.success(res.message);
      refetch(); // Refetch bookmark status to update UI
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(
        error.data?.message || error.error || 'An unknown error occurred'
      );
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
