import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
