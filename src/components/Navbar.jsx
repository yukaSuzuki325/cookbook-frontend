import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiMenu, BiUserCircle } from 'react-icons/bi';
import { FaUtensils } from 'react-icons/fa';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState();

  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center cursor-pointer"
        >
          <FaUtensils className="text-orange-500 text-3xl mr-2" />

          <span className="font-bold text-xl text-gray-800">cookbook</span>
        </div>

        {/* Menu Button */}
        <div className="relative">
          <button
            className="flex items-center gap-2 bg-gray-100 p-2 rounded-full hover:shadow-lg"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <BiMenu className="text-gray-600 text-xl" />
            <BiUserCircle className="text-orange-500 text-xl" />
          </button>

          {/* Dropdown Menu */}

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-md border">
              <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                Login
              </button>
              <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
