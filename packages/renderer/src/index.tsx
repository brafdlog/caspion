import 'bootstrap/dist/css/bootstrap.css';
import { configure } from 'mobx';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.module.css';
import reportWebVitals from './reportWebVitals';
import App from './components/App';

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
    observableRequiresReaction: true,
    disableErrorBoundaries: true,
  });
}
