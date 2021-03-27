import Header from './components/Header';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import MainContextProvider from './contexts/MainContext';

function App() {
  return (
    <MainContextProvider>
      <div className="grid">
        <Header />
        <Dashboard />
        <Home />
      </div>
    </MainContextProvider>
  );
}

export default App;
