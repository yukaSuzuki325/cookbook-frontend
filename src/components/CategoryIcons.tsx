import { FaLeaf, FaFish, FaCarrot, FaDrumstickBite } from 'react-icons/fa';
import { PiCookingPotFill } from 'react-icons/pi';
import { JSX } from 'react';

type CategoryType = 'All' | 'Vegan' | 'Vegetarian' | 'Fish' | 'Meat';

interface CategoryIconsProps {
  category: CategoryType;
  setCategory: (category: CategoryType) => void;
}

const CategoryIcons = ({ category, setCategory }: CategoryIconsProps) => {
  const baseButtonClass = 'flex flex-col items-center';
  const iconClass = 'text-3xl mb-2';

  const buttonArray: { name: CategoryType; icon: JSX.Element }[] = [
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
            <p>{name}</p>
          </button>
        );
      })}
    </div>
  );
};
export default CategoryIcons;
