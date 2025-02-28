import { useAuthDispatch, useAuthSelector } from '../features/auth/hooks.ts';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../features/api/usersApiSlice.ts';
import { removeCredentials } from '../features/auth/authSlice.ts';

interface DropdownMenuProps {
  isDropdownOpen: boolean;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
}

const DropdownMenu = ({
  isDropdownOpen,
  setIsDropdownOpen,
}: DropdownMenuProps) => {
  const { userInfo } = useAuthSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  const [logoutApiCall] = useLogoutUserMutation();

  const buttonClass =
    'block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100';

  const handleClickMenu = (route: string) => {
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
          {[
            { name: 'Add Recipe', link: '/recipes/add' },
            { name: 'Bookmarks', link: '/recipes/bookmarked' },
            { name: 'My Recipes', link: '/recipes/my-recipes' },
            { name: 'Profile', link: '/profile' },
            { name: 'Logout', link: '' },
          ].map(({ name, link }) => (
            <button
              key={name}
              className={buttonClass}
              onClick={() => {
                name !== 'Logout' ? handleClickMenu(link) : logoutHandler();
              }}
            >
              {name}
            </button>
          ))}
        </>
      ) : (
        <>
          {[
            { name: 'Login', link: '/login' },
            { name: 'Register', link: '/register' },
          ].map(({ name, link }) => (
            <button
              key={name}
              className={buttonClass}
              onClick={() => {
                handleClickMenu(link);
              }}
            >
              {name}
            </button>
          ))}
        </>
      )}
    </div>
  );
};
export default DropdownMenu;
