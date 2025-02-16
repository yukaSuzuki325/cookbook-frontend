import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import RecipePage from './pages/RecipePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AddRecipePage from './pages/AddRecipePage.jsx';

import EditRecipePage from './pages/EditRecipePage.jsx';
import MyRecipesPage from './pages/MyRecipesPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import BookmarkedRecipesPage from './pages/BookmarkedRecipesPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        index={true}
        path="/"
        element={<HomePage />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/recipes/:id"
        element={<RecipePage />}
        errorElement={<ErrorPage />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
      {/* Private routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route
          path="/profile"
          element={<ProfilePage />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/recipes/my-recipes"
          element={<MyRecipesPage />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/recipes/add"
          element={<AddRecipePage />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/recipes/bookmarked"
          element={<BookmarkedRecipesPage />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/recipes/:id/edit"
          element={<EditRecipePage />}
          errorElement={<ErrorPage />}
        />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
