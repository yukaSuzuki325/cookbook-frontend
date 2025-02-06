import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <main className="container mx-auto px-6 py-4">
        <Outlet />
      </main>
    </>
  );
};

export default App;
