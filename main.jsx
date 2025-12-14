import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index.css'
import App from './App.jsx'
import ChatMessage from '../src/component/ChatMessage';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>, 
)
