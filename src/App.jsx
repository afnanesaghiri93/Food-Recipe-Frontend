
import './App.css'// Importing global styles from an external CSS file
import {BrowserRouter, Routes, Route, Router } from 'react-router-dom'; // Importing components from react-router-dom for routing
import HomePage from './pages/HomePage';// Importing the HomePage component
import SavedRecipe from './pages/SavedRecipe';// Importing the SavedRecipe component
import Createrecipe from './pages/Createrecipe';// Importing the Createrecipe component
import { AuthPage } from './pages/authPage';// Importing the AuthPage component
import { Navbar } from './components/NavbarPage'; // Importing the Navbar component
function App() {


  return (
    // <BrowserRouter>{/* wrapping all routes inside BrowserRouter */}
   <div className="App">
          <h1 style={{  margin: '20px 0', color: '#7209b7' ,textAlign: 'center', fontSize: '3rem', 
   fontWeight: 'bold', padding: '10px 20px', borderRadius:'10px', backgroundColor:'#f5d1f3' }}>Yummy Recipes</h1>{/* Yummy recipe is the name of this web apllication  */}
    <Navbar/> {/* navbar component stays outside of Routes, so it appears on every page */} 
 <Routes> 
  <Route path= "/" element= {<HomePage/>}/>{/* HomePage route */}
  <Route path= '/authpage' element={<AuthPage/>}/> {/* authentication page route */}
  <Route path= '/createrecipe' element={<Createrecipe/>}/> {/* CreateRecipe page route */}
  <Route path= '/savedrecipe' element={<SavedRecipe/>}/> {/* SavedRecipes page route */}
  </Routes>
  
   </div>
  //  </BrowserRouter>
  )
}

export default App;// exporting the App component as default export
