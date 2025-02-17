import { baseApi } from './baseApi';

export const imageApiSlice = baseApi.injectEndpoints({
  reducerPath: 'imageApi',
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
