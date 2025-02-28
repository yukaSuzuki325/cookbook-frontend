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
import { store } from './store.ts';
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import RecipePage from './pages/RecipePage.jsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import AddRecipePage from './pages/AddRecipePage.tsx';
import EditRecipePage from './pages/EditRecipePage.tsx';
import MyRecipesPage from './pages/MyRecipesPage.jsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import BookmarkedRecipesPage from './pages/BookmarkedRecipesPage.jsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';

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
