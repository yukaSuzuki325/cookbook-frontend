import { configureStore } from '@reduxjs/toolkit';
import { usersApiSlice } from '../src/features/api/usersApiSlice';
import { recipesApiSlice } from '../src/features/api/recipesApiSlice';
import { baseApi } from '../src/features/api/baseApi';
import authReducer from './features/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    [recipesApiSlice.reducerPath]: recipesApiSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
