import { configureStore } from '@reduxjs/toolkit';
import { usersApiSlice } from '../src/features/api/usersApiSlice';
import { recipesApiSlice } from '../src/features/api/recipesApiSlice';

const store = configureStore({
  reducer: {
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    [recipesApiSlice.reducerPath]: recipesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApiSlice.middleware)
      .concat(recipesApiSlice.middleware),
});

export default store;
