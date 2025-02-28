import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar.tsx';

const App = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <ToastContainer />
      <main className="container mx-auto px-10 py-14">
        <Outlet />
      </main>
    </>
  );
};

export default App;
