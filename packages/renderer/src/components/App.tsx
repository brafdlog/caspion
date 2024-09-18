import { StoresProvider } from '../store';
import './App.css';
import Body from './Body';
import TopBar from './topBar/TopBar';

function App() {
  return (
    <StoresProvider>
      <div className="App">
        <TopBar />
        <Body />
      </div>
    </StoresProvider>
  );
}

export default App;
