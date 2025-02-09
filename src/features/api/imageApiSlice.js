import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const imageApiSlice = createApi({
  reducerPath: 'imageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/image`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = imageApiSlice;
