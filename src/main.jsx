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
import BookmarkButton from './components/BookmarkButton.jsx';
import EditRecipePage from './pages/EditRecipePage.jsx';
import MyRecipesPage from './pages/MyRecipesPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import BookmarkedRecipesPage from './pages/BookmarkedRecipesPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/recipes/:id" element={<RecipePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* Private routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/recipes/my-recipes" element={<MyRecipesPage />} />
        <Route path="/recipes/add" element={<AddRecipePage />} />
        <Route path="/recipes/bookmarked" element={<BookmarkedRecipesPage />} />
        <Route path="/recipes/:id/edit" element={<EditRecipePage />} />
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
