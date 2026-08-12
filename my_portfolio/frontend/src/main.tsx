import {StrictMode} from 'react';
// @ts-ignore: Missing declaration for react-dom/client in this environment
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
