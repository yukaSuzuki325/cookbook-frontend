import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApiSlice = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/users`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = usersApiSlice;
