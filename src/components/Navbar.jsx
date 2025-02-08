import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutUserMutation } from '../features/api/usersApiSlice';
import { BiMenu, BiUserCircle } from 'react-icons/bi';
import { MdRamenDining } from 'react-icons/md';
import { removeCredentials } from '../features/auth/authSlice';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutUserMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(removeCredentials());
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
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
            <BiMenu className="text-gray-600 text-xl" />
            {userInfo ? (
              <div className="text-gray-600">{userInfo.name}</div>
            ) : (
              <BiUserCircle className="text-orange-500 text-xl" />
            )}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-md border">
              {userInfo ? (
                <>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate('/recipes/add')}
                  >
                    Add Recipe
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate('/recipes/bookmarked')}
                  >
                    Bookmarks
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate('/recipes/my-recipes')}
                  >
                    My Recipes
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate('/profile')}
                  >
                    Profile
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate('/register')}
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
