import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://cookbook-backend-5yyk.onrender.com/api';

// Create a base API slice
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include', // Ensure cookies are sent with requests
  }),
  endpoints: () => ({}), // Empty, will be extended by other API slices
});

export default baseApi;
