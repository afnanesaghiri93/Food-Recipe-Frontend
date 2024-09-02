import {Link, useNavigate} from 'react-router-dom'
import { useCookies } from 'react-cookie'
export const Navbar = () => {
    const [cookies, setCookie]= useCookies(["access_token"]);
    const navigate = useNavigate();
    const Logout = () => {
        setCookie("access_token", "");
        window.localStorage.removeItem("userID")
        navigate('/authpage')
    }
    return( <div className='navbar'> 
    <Link to='/'>
        Home
         </Link>
         <Link to='/Createrecipe'>
      Create Recipes
         </Link>
         <Link to='/SavedRecipe'>
        Saved Recipes
         </Link>
         {!cookies.access_token ? 
         (<Link to='/authPage'>Login/SignUp </Link>
         ) : (
            <>
         <button className='logout-button' onClick={Logout}> Logout</button>
            </>
         )}
        
         
    </div>
    )
}