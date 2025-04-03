import { useState, useEffect, useRef, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthSelector } from '../features/auth/hooks.ts';
import { BiMenu, BiUserCircle } from 'react-icons/bi';
import { MdRamenDining } from 'react-icons/md';
import DropdownMenu from './DropdownMenu.tsx';

const Navbar = () => {
  // Track whether the dropdown menu is open
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Ref to detect outside clicks on the dropdown
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Get current user info from Redux store
  const { userInfo } = useAuthSelector((state) => state.auth);

  const navigate = useNavigate();

  // Close the dropdown if the user clicks outside of it
  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      e.target instanceof Node && // Ensures e.target is a valid Node
      !dropdownRef.current.contains(e.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  // Add and clean up the outside click event listener
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Conditionally render either the user's name or a user icon depending on auth status
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
