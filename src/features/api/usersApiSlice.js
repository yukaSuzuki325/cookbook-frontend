import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApiSlice = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/users`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: '/auth',
        method: 'POST',
        body: data,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: '/profile',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useUpdateUserMutation,
} = usersApiSlice;
