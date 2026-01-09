import 'bootstrap/dist/css/bootstrap.css';
import { configure } from 'mobx';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './index.module.css';
import reportWebVitals from './reportWebVitals';
import logger from './logging/logger';

logger.info('Frontend started');

configureMobxLinting();

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function configureMobxLinting() {
  configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: false, // Disabled - too noisy for deep nested objects
    disableErrorBoundaries: true,
  });
}
