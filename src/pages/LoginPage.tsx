import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginUserMutation } from '../features/api/usersApiSlice.ts';
import { setCredentials } from '../features/auth/authSlice.ts';
import { toast } from 'react-toastify';
import LoadingPage from '../components/LoadingPage';
import AuthForm from '../components/AuthForm';
import { type ApiError } from '../features/api/types';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginUserMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate('/');
  }, [userInfo, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log('loggedin', res);
      dispatch(setCredentials(res));
      navigate('/');
    } catch (err: unknown) {
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
