import {Link} from 'react-router-dom'

export const Navbar = () => {
    return <div className='navbar'> 
    <Link to='/'>
        Home
         </Link>
         <Link to='/Createrecipe'>
      Create Recipes
         </Link>
         <Link to='/SavedRecipe'>
        Saved Recipes
         </Link>
         <Link to='/authPage'>
        Login/SignUp
         </Link>
         
    </div>
}