import { useNavigate } from 'react-router-dom';
import { useDeleteRecipeMutation } from '../features/api/recipesApiSlice';
import { FaClock, FaEdit, FaTrash } from 'react-icons/fa';
import { BiSolidCategory } from 'react-icons/bi';
import { toast } from 'react-toastify';

const RecipeCard = ({
  title,
  category,
  imageUrl,
  _id,
  cookingTime,
  description,
  showActions,
  onRecipeDeleted,
}) => {
  const [deleteRecipe] = useDeleteRecipeMutation();
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/recipes/${_id}/edit`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        console.log(_id);

        const res = await deleteRecipe(_id).unwrap();
        toast.success(res.message);
        onRecipeDeleted(); //Call refetch in MyRecipePage component
      } catch (error) {
        toast.error(error?.data?.message || 'Failed to delete the recipe.');
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
        <p className="text-gray-600">{description}</p>
        <p className="flex items-center  text-gray-600">
          <BiSolidCategory className="text-gray-500 text-lg mr-2" /> {category}
        </p>
        <p className="flex items-center text-gray-600">
          <FaClock className="text-gray-500 text-lg mr-2" /> {cookingTime}{' '}
          minutes
        </p>
        {showActions && (
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleEdit}
              className="flex items-center justify-center w-10 h-10 border border-orange-300 rounded text-orange-500 bg-white hover:bg-orange-100"
            >
              <FaEdit size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center justify-center w-10 h-10 border border-orange-300 rounded text-orange-500 bg-white hover:bg-orange-100"
            >
              <FaTrash size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
