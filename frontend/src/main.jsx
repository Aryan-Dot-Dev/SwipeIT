import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import ClickSpark from './components/ClickSpark.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <ClickSpark
      sparkColor='#000'
      sparkSize={10}
      sparkRadius={15}  
      sparkCount={8}
      duration={400}
    >
      <App  />
    </ClickSpark>
  </StrictMode>,
)
