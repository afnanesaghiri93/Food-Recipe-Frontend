
import { StrictMode } from 'react';// import StrictMode from React to highlight potential problems in an application
import { createRoot } from 'react-dom/client';// import createRoot from react-dom/client. This is the new API for rendering React applications  
import App from './App.jsx';// import the main App component from the App.jsx file. This component contains the core logic and structure of the application
import './index.css';// import the global CSS file for styling the application. This file contains the CSS rules that apply to the entire application
import { BrowserRouter as Router} from 'react-router-dom';// import BrowserRouter  from react-router-dom for handling client-side routing in the React application


// create a root DOM node and render the React application into it.
// createRoot :is used to initialize the React application and attach it to a DOM element with the id 'root'.

createRoot(document.getElementById('root')).render(
  // wrap the application in StrictMode to enable additional checks and warnings for components
  <StrictMode>
     <Router>  {/* wrap the App component in Router to enable client-side routing throughout the application */}
    <App /> {/* render the main App component, which is the entry point of the application */}
    </Router>
  </StrictMode>,
)
