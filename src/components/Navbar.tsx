import { useState, useEffect, useRef, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthSelector } from '../features/auth/hooks.ts';
import { BiMenu, BiUserCircle } from 'react-icons/bi';
import { MdRamenDining } from 'react-icons/md';
import DropdownMenu from './DropdownMenu.tsx';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); //Since dropdownRef refers to a div

  const { userInfo } = useAuthSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      e.target instanceof Node && // Ensures e.target is a valid Node
      !dropdownRef.current.contains(e.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  //Define the userOnMenu element to render depending on login status
  let userOnMenu: ReactNode = userInfo ? (
    <div className="text-gray-600">{userInfo.name}</div>
  ) : (
    <BiUserCircle className="text-orange-500 text-xl" />
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-10">
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center cursor-pointer"
        >
          <MdRamenDining className="text-orange-500 text-3xl mr-2" />
          <span className="font-bold text-xl text-gray-800">cookbook</span>
        </div>

        {/* Menu Button */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 bg-gray-100 p-2 rounded-full hover:shadow-lg"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <BiMenu className="text-orange-600 text-xl" />
            {userOnMenu}
          </button>

          {isDropdownOpen && (
            <DropdownMenu
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
