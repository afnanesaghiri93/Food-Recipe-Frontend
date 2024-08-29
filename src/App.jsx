
import './App.css'
import {BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SavedRecipe from './pages/SavedRecipe';
import Createrecipe from './pages/Createrecipe';
import { AuthPage } from './pages/authPage';
import { Navbar } from './components/NavbarPage';
function App() {


  return (
   <div className="App">
  
    <Navbar/>
 <Routes> 
  <Route path= "/" element= {<HomePage/>}/>
  <Route path= '/authpage' element={<AuthPage/>}/>
  <Route path= '/createrecipe' element={<Createrecipe/>}/>
  <Route path= '/savedrecipe' element={<SavedRecipe/>}/>
  
  </Routes>
  
   </div>
  )
}

export default App
