import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../features/api/usersApiSlice.ts';
import { removeCredentials } from '../features/auth/authSlice.ts';

const DropdownMenu = ({ isDropDownOpen, setIsDropdownOpen }) => {
  const { userInfo } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutUserMutation();

  const handleClickMenu = (route) => {
    setIsDropdownOpen((prev) => !prev);
    navigate(route);
  };

  const logoutHandler = async () => {
    setIsDropdownOpen((prev) => !prev);
    try {
      await logoutApiCall().unwrap();
      dispatch(removeCredentials());
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-md border">
      {userInfo ? (
        <>
          <button
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={() => handleClickMenu('/recipes/add')}
          >
            Add Recipe
          </button>
          <button
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={() => handleClickMenu('/recipes/bookmarked')}
          >
            Bookmarks
          </button>
          <button
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={() => handleClickMenu('/recipes/my-recipes')}
          >
            My Recipes
          </button>
          <button
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={() => handleClickMenu('/profile')}
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
            onClick={() => handleClickMenu('/login')}
          >
            Login
          </button>
          <button
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={() => handleClickMenu('/register')}
          >
            Register
          </button>
        </>
      )}
    </div>
  );
};
export default DropdownMenu;
