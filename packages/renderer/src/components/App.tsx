import { useEffect } from 'react';
import { StoresProvider } from '../store';
import './App.css';
import Body from './Body';
import TopBar from './topBar/TopBar';
import logger from '../logging/logger';

function App() {
  useEffect(() => {
    logger.info(`${App.name} rendered`);
  }, []);
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
