import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@genpact/ui/theme.css';   // Meridian + tokens + Inter, both themes — one import
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
