
import { StrictMode } from 'react';// Import StrictMode from React to highlight potential problems in an application
import { createRoot } from 'react-dom/client';// Import createRoot from react-dom/client. This is the new API for rendering React applications  
import App from './App.jsx';// Import the main App component from the App.jsx file. This component contains the core logic and structure of the application
import './index.css';// Import the global CSS file for styling the application. This file contains the CSS rules that apply to the entire application
import { BrowserRouter as Router} from 'react-router-dom';// Import BrowserRouter  from react-router-dom for handling client-side routing in the React application


// Create a root DOM node and render the React application into it.
// `createRoot` is used to initialize the React application and attach it to a DOM element with the id 'root'.

createRoot(document.getElementById('root')).render(
  // Wrap the application in StrictMode to enable additional checks and warnings for components
  <StrictMode>
     <Router>  {/* Wrap the App component in Router to enable client-side routing throughout the application */}
    <App /> {/* Render the main App component, which is the entry point of the application */}
    </Router>
  </StrictMode>,
)
