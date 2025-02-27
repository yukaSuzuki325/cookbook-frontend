import { baseApi } from './baseApi.ts';
import {
  type AuthResponse,
  type RegisterRequest,
  type LoginRequest,
  type UpdateUserRequest,
} from '../../types/userTypes.ts';

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
