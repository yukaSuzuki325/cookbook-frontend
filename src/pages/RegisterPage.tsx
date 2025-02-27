import { useState, useEffect } from 'react';
import { useAuthDispatch, useAuthSelector } from '../features/auth/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../features/api/usersApiSlice.ts';
import { setCredentials } from '../features/auth/authSlice.ts';
import { toast } from 'react-toastify';
import LoadingPage from '../components/LoadingPage';
import AuthForm from '../components/AuthForm';
import { type ApiError } from '../features/api/types';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const dispatch = useAuthDispatch();
  const { userInfo } = useAuthSelector((store) => store.auth);
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterUserMutation();

  useEffect(() => {
    if (userInfo) navigate('/');
  }, [userInfo, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials(res));
        navigate('/');
      } catch (err: unknown) {
        const error = err as ApiError;
        toast.error(
          error.data?.message || error.error || 'An unknown error occurred'
        );
      }
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <AuthForm
      title="Register"
      fields={[
        {
          id: 'name',
          label: 'Name',
          type: 'text',
          value: name,
          onChange: handleChange,
          required: true,
          placeholder: 'Enter name',
        },
        {
          id: 'email',
          label: 'Email Address',
          type: 'email',
          value: email,
          onChange: handleChange,
          required: true,
          placeholder: 'Enter email',
        },
        {
          id: 'password',
          label: 'Password',
          type: 'password',
          value: password,
          onChange: handleChange,
          required: true,
          placeholder: 'Enter password',
        },
        {
          id: 'confirmPassword',
          label: 'Confirm Password',
          type: 'password',
          value: confirmPassword,
          onChange: handleChange,
          required: true,
          placeholder: 'Confirm password',
        },
      ]}
      buttonText="Register"
      onSubmit={handleSubmit}
      bottomText="Already have an account?"
      bottomLinkText="Login"
      bottomLinkHref="/login"
    />
  );
};

export default RegisterPage;
