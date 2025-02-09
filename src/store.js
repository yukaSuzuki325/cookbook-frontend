import { configureStore } from '@reduxjs/toolkit';
import { usersApiSlice } from '../src/features/api/usersApiSlice';
import { recipesApiSlice } from '../src/features/api/recipesApiSlice';
import { imageApiSlice } from './features/api/imageApiSlice';
import authReducer from './features/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    [recipesApiSlice.reducerPath]: recipesApiSlice.reducer,
    [imageApiSlice.reducerPath]: imageApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApiSlice.middleware)
      .concat(recipesApiSlice.middleware)
      .concat(imageApiSlice.middleware),
  devTools: true,
});

export default store;
