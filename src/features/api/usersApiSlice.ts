import { baseApi } from './baseApi.ts';

// Define TypeScript interfaces for API responses and requests
export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface AuthResponse extends User {}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
}

export interface UpdateUserRequest {
  _id: string;
  name: string;
  email: string;
  password?: string;
}

export const usersApiSlice = baseApi.injectEndpoints({
  // reducerPath: 'usersApi',
  endpoints: (builder) => ({
    registerUser: builder.mutation<AuthResponse, RegisterRequest>({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: data,
      }),
    }),
    loginUser: builder.mutation<AuthResponse, LoginRequest>({
      query: (data) => ({
        url: '/users/auth',
        method: 'POST',
        body: data,
      }),
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
    }),
    updateUser: builder.mutation<AuthResponse, UpdateUserRequest>({
      query: (data) => ({
        url: '/users/profile',
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
