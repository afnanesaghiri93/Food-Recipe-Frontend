import {Link, useNavigate} from 'react-router-dom';// Importing Link for navigation and useNavigate for navigation
import { useCookies } from 'react-cookie';// Importing useCookies hook to manage cookies
export const Navbar = () => {
     // useCookies hook to manage the access token cookie
    const [cookies, setCookie]= useCookies(["access_token"]);
     // useNvigate for navigation 
    const navigate = useNavigate();
    // Logout function to clear the cookie and local storage, then navigate to the AuthPage
    const Logout = () => {
        setCookie("access_token", ""); // Clear the access token cookie
        window.localStorage.removeItem("userID")// Remove the userID from local storage
        navigate('/authpage')// Navigate to the AuthPage
    }
    return( <nav className='navbar'> 
    <Link to='/'>
        Home
         </Link>
         <Link to='/Createrecipe'>
      Create Recipes
         </Link>
         <Link to='/SavedRecipe'>
        Saved Recipes
         </Link>
         {/* conditional rendering based on access_token */}
          {/* : otherwise Show Login/SignUp if not logged in */}
         {!cookies.access_token ? 
        
         (<Link to='/authPage'>Login/SignUp </Link>
         ) : (
            <>
         <button className='logout-button' onClick={Logout}> Logout</button>{/* : otherwise  Show Logout button if logged in */}

            </>
         )}
        
         
    </nav>
    )
}