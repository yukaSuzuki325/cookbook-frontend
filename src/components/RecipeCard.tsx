import { useNavigate } from 'react-router-dom';
import { useDeleteRecipeMutation } from '../features/api/recipesApiSlice.ts';
import { FaClock, FaEdit, FaTrash } from 'react-icons/fa';
import { BiSolidCategory } from 'react-icons/bi';
import { toast } from 'react-toastify';
import IconButton from './IconButton.tsx';
import { ApiError } from '../types/apiTypes.ts';
import React from 'react';

interface RecipeCardProps {
  title: string;
  category: string;
  imageUrl: string;
  _id: string;
  cookingTime: number;
  showActions?: boolean;
  onRecipeDeleted?: () => void;
}

const RecipeCard = ({
  title,
  category,
  imageUrl,
  _id,
  cookingTime,
  showActions,
  onRecipeDeleted,
}: RecipeCardProps) => {
  const [deleteRecipe] = useDeleteRecipeMutation();
  const navigate = useNavigate();

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/recipes/${_id}/edit`);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        console.log(_id);

        const res = await deleteRecipe(_id).unwrap();
        toast.success(res.message);

        if (onRecipeDeleted) {
          onRecipeDeleted();
        }
      } catch (err: unknown) {
        const error = err as ApiError;
        toast.error(
          error.data?.message || error.error || 'An unknown error occurred'
        );
      }
    }
  };

  return (
    <div
      onClick={() => navigate(`/recipes/${_id}`)}
      className="bg-white hover:shadow-lg transition overflow-hidden cursor-pointer"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>

        <p className="flex items-center  text-gray-600">
          <BiSolidCategory className="text-gray-500 text-lg mr-2" /> {category}
        </p>
        <p className="flex items-center text-gray-600">
          <FaClock className="text-gray-500 text-lg mr-2" /> {cookingTime}{' '}
          minutes
        </p>
        {showActions && (
          <div className="flex justify-end gap-2 mt-4">
            <IconButton
              onClick={handleEdit}
              icon={<FaEdit size={16} />}
              ariaLabel="Edit recipe"
            />
            <IconButton
              onClick={handleDelete}
              icon={<FaTrash size={16} />}
              ariaLabel="Delete recipe"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
