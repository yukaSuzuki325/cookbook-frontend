import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-gray-600 mb-6">Oops! An unexpected error occurred.</p>
      {error && (
        <div className="bg-gray-100 border border-gray-300 rounded p-4">
          <h2 className="text-2xl font-semibold mb-2">
            {error.status || 'Error'}
          </h2>
          <p className="text-gray-700">{error.statusText || error.message}</p>
        </div>
      )}
      <button
        onClick={() => (window.location.href = '/')}
        className="mt-4 px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
