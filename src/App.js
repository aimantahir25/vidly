import './App.css';
import { Home } from './pages';
import { UserContextProvider } from './context/useUser';

function App() {
  return (
    <UserContextProvider>
    <div className="App">
      <Home />
    </div>
    </UserContextProvider>
    );
}

export default App;
