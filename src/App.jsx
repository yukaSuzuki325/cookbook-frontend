import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-6 py-4">
        <HomePage />
      </main>
    </div>
  );
};

export default App;
