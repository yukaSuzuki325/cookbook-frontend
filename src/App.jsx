import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <main className="container mx-auto px-10 py-14">
        <Outlet />
      </main>
    </>
  );
};

export default App;
