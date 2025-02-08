import { useNavigate } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';
import { BiSolidCategory } from 'react-icons/bi';

const RecipeCard = ({
  title,
  category,
  imageUrl,
  _id,
  cookingTime,
  description,
}) => {
  const navigate = useNavigate();

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
      </div>
    </div>
  );
};

export default RecipeCard;
