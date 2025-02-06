import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ title, category, imageUrl, id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/recipes/${id}`)}
      className="bg-white  hover:shadow-lg transition overflow-hidden cursor-pointer"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-500">{category}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
