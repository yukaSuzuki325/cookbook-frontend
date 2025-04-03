import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthDispatch, useAuthSelector } from '../features/auth/hooks.ts';
import { useLoginUserMutation } from '../features/api/usersApiSlice.ts';
import { setCredentials } from '../features/auth/authSlice.ts';
import { toast } from 'react-toastify';
import LoadingPage from '../components/LoadingPage.js';
import AuthForm from '../components/AuthForm';
import { type ApiError } from '../types/apiTypes.ts';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginUserMutation();
  const { userInfo } = useAuthSelector((state) => state.auth);

  // Redirect to homepage if already logged in
  useEffect(() => {
    if (userInfo) navigate('/');
  }, [userInfo, navigate]);

  // Update formData state on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();

      // Save credentials to Redux store
      dispatch(setCredentials(res));

      // Redirect to homepage
      navigate('/');
    } catch (err: unknown) {
      // Show error toast if login fails
      const error = err as ApiError;
      toast.error(
        error.data?.message || error.error || 'An unknown error occurred'
      );
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <AuthForm
      title="Sign In"
      fields={[
        {
          id: 'email',
          label: 'Email Address',
          type: 'text',
          value: email,
          required: true,
          placeholder: 'Enter email',
          onChange: handleChange,
        },
        {
          id: 'password',
          label: 'Password',
          type: 'password',
          value: password,
          required: true,
          placeholder: 'Enter password',
          onChange: handleChange,
        },
      ]}
      buttonText="Sign In"
      bottomText="New Member?"
      bottomLinkText="Register"
      bottomLinkHref="/register"
      onSubmit={handleSubmit}
    />
  );
};

export default LoginPage;
