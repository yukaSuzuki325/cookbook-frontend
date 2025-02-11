import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:8080/api'
    : 'https://cookbook-backend-5yyk.onrender.com/api';

export const imageApiSlice = createApi({
  reducerPath: 'imageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/image`,
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
