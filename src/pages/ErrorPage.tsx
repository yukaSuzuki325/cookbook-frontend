import { ReactNode } from 'react';
import { useRouteError } from 'react-router-dom';
import ActionButton from '../components/ActionButton';

interface ErrorResponse {
  status?: number;
  statusText?: string;
  message?: string;
}

const ErrorPage = () => {
  const error = useRouteError() as ErrorResponse;

  let errorMessage: ReactNode;

  if (error) {
    errorMessage = (
      <div className="bg-gray-100 border border-gray-300 rounded p-4">
        <h2 className="text-2xl font-semibold mb-2">
          {error.status || 'Error'}
        </h2>
        <p className="text-gray-700">{error.statusText || error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-gray-600 mb-6">Oops! An unexpected error occurred.</p>
      {errorMessage}
      <ActionButton onClick={() => (window.location.href = '/')}>
        Go Back to Home
      </ActionButton>
    </div>
  );
};

export default ErrorPage;
