import { useState } from "react";// Import the useState hook from React to manage state in functional components 
import axios from 'axios'; // Import axios , a library for making HTTP request 
import { useNavigate } from "react-router-dom";// Import the useNavigate  hook from react-router-dom for navigation
import {useCookies}  from 'react-cookie' // to set token into our cookies and to do that we have to import a hook from react cookie called useCookies

//Export the AuthPage component
export const AuthPage = ()=> {
  // Return div with login and Register components that renders a div with two children components:login and register
  return <div  className="auth">
    <Login /> {/*reneder the login component*/}
    <Register />{/*reneder the register component*/}
  </div>
  
}

// useState is ysed to create a state variable called username or password with the initial value of an emty string
// setUsername or setPassword is a function thatt will be used to update the username, password state
// define the login components
const Login = () => {
  //useState hook to manage username state
  const [username, setUsername] = useState("");
  //useState hook to manage paasword state
  const [password, setPassword] = useState("");
  //useCookies hook to manage cookies, specially 'access_token'
  const [cookies, setCookie]= useCookies(["access_token"]);
  //useNavigate hook to navigate 
  const navigate = useNavigate();
//onSubmit function for handling form submission
  const onSubmit = async (event) => {
    event.preventDefault();// Prevent the default form submission behavior
    try{
       // Make a POST req to backend server at the login API endpoint with username, password 
      //axios.post returns a promise that resolves to the response object from the server
      const response = await axios.post("http://localhost:3001/auth/login",{username, password});// setthe response that we get back from API
      
     //Set a cookie named ' access_token'with the value from response.data.token
     //the path option {path:'/'} makes the cookie acseeible throughout the entire site
      setCookie("access_token", response.data.token, {path:'/'});
      // Save and store the userID in  local storage for future use
      window.localStorage.setItem("userID", response.data.userID);
      // Navigate to the HomePage after login
      navigate("/");
    
    }catch(err) {
      console.error(err)// log any errors to the console
      alert("Login failed. Please try again.");// show an alert if login fails
    }
  };
  // Return the form component with props for login 
  return (
  <Form
  formId="login-form"// Form ID for the login form 
  username={username} // Pass the username state 
  setUsername={setUsername} // Pass the setUsername function 
  password={password} // Pass the password state 
  setPassword={setPassword}// Pass the setPassword funcyion 
  label="Login"// Label for the form button
  onSubmit={onSubmit}// Pass the OnSubmit function
  />)};
  
// Define the register component 
const Register= () => {
//useState hook to manage username state
  const [username, setUsername] = useState("");
   //useState hook to manage paasword state
  const [password, setPassword] = useState("");
//onSubmit function for handling form submission
  const onSubmit = async(event) =>{
    event.preventDefault();// Prevent the default form submission behavior
    try{
      // Make a POST req to backend server at the register API endpoint with username, password 
      //axios.post returns a promise that resolves to the response object from the server
      await axios.post("http://localhost:3001/auth/register",{username, password});
      
      alert("Succesfully Registration! Now Login")// show an alert if succesful login
    }catch(err){
console.error(err);
alert("Registration failed. Please try again.");// show an alert if registration failed
    }
// Return the form component with props for register
  }
  return (
  <Form 
  formId="signup-form"
  username={username} 
  setUsername={setUsername} 
  password={password}
   setPassword={setPassword}
   label="SignUp"
   onSubmit={onSubmit}
   />)};

   // define the Form components
  const Form = ({username, setUsername ,password, setPassword, label, onSubmit,}) =>{
    // return Jsx for the form layout
  return(
    // container for the form
     <div className="auth-container">{/* Container for the form */ }
    <form onSubmit={onSubmit}>{/*form element with onsubmit handler */}
      <h2>{label}</h2> {/*display form labe;*/}
      <div className="form-group">{/*group for username input */}
      <label htmlFor="username"> Username :</label>{/*username label */}
      <input 
      type="text" 
      id="username" 
      value={username} onChange={(event) =>  setUsername(event.target.value)} />
  </div>
  <div className="form-group">
      <label htmlFor="password"> Password :</label>
      <input 
      type="password" 
      id="password" // id attribute for input
      value={password} // controlled input tht reflects the current password state
      onChange={(event) => setPassword(event.target.value)} />{/*update the password state on input change */}
  </div>
  <button type="submit">{label}</button>{/*submit button for the form, label change based on props*/}
  </form>
  </div>
   
  )};





  
