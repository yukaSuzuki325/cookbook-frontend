import { configureStore } from '@reduxjs/toolkit';
import { usersApiSlice } from '../src/features/api/usersApiSlice.ts';
import { recipesApiSlice } from '../src/features/api/recipesApiSlice.ts';
import { baseApi } from '../src/features/api/baseApi.ts';
import authReducer from './features/auth/authSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    [recipesApiSlice.reducerPath]: recipesApiSlice.reducer,
    //[baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
store;
