import { useState, useEffect } from 'react';
import { useAuthDispatch, useAuthSelector } from '../features/auth/hooks.ts';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../features/api/usersApiSlice.ts';
import { setCredentials } from '../features/auth/authSlice.ts';
import AuthForm from '../components/AuthForm';
import { type ApiError } from '../types/apiTypes.ts';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const { userInfo } = useAuthSelector((store) => store.auth);
  const dispatch = useAuthDispatch();

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setFormData({
      ...formData,
      name: userInfo?.name || '',
      email: userInfo?.email || '',
    });
  }, [userInfo?.email, userInfo?.name]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      if (!userInfo?._id) {
        throw new Error('User ID is missing');
      }
      try {
        const res = await updateProfile({
          name,
          email,
          password,
          _id: userInfo._id,
        }).unwrap();

        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err: unknown) {
        const error = err as ApiError;
        toast.error(
          error.data?.message || error.error || 'An unknown error occurred'
        );
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <AuthForm
      title="Profile"
      buttonText="Update"
      onSubmit={handleSubmit}
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
          required: false,
          placeholder: 'Enter password',
        },
        {
          id: 'confirmPassword',
          label: 'Confirm Password',
          type: 'password',
          value: confirmPassword,
          onChange: handleChange,
          required: false,
          placeholder: 'Confirm password',
        },
      ]}
    />
  );
};
export default ProfilePage;
