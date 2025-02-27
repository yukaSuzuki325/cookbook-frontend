import { FaLeaf, FaFish, FaCarrot, FaDrumstickBite } from 'react-icons/fa';
import { PiCookingPotFill } from 'react-icons/pi';

interface CategoryIconsProps {
  category: 'All' | 'Vegan' | 'Vegetarian' | 'Fish' | 'Meat';
  setCategory: (category: string) => void;
}

const CategoryIcons = ({ category, setCategory }: CategoryIconsProps) => {
  const baseButtonClass = 'flex flex-col items-center';
  const iconClass = 'text-3xl mb-2';

  const buttonArray = [
    { name: 'All', icon: <PiCookingPotFill className={iconClass} /> },
    { name: 'Vegan', icon: <FaLeaf className={iconClass} /> },
    { name: 'Vegetarian', icon: <FaCarrot className={iconClass} /> },
    { name: 'Fish', icon: <FaFish className={iconClass} /> },
    { name: 'Meat', icon: <FaDrumstickBite className={iconClass} /> },
  ];

  return (
    <div className="flex justify-around mb-8">
      {buttonArray.map(({ name, icon }) => {
        return (
          <button
            key={name}
            className={`${baseButtonClass} ${
              category === name ? 'text-green-600' : 'text-gray-600'
            }`}
            onClick={() => setCategory(name)}
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
};
export default CategoryIcons;
