import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useCookies}  from 'react-cookie' // to set token into our cookies and to do that we have to import a hook from react cookie called useCookies


export const AuthPage = ()=> {
  return <div  className="auth">
    <Login />
    <Register />
  </div>
  
}


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie]= useCookies(["access_token"])
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try{
      const response = await axios.post("http://localhost:3001/auth/login",{username, password});// setthe response that we get back from API
      
     
      setCookie("access_token", response.data.token, {path:'/'});
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    
    }catch(err) {
      console.error(err)
      alert("Login failed. Please try again.");
    }
  }
  return (
  <Form
  formId="login-form"
  username={username} 
  setUsername={setUsername} 
  password={password} 
  setPassword={setPassword}
  label="Login"
  onSubmit={onSubmit}
  />)};
  

 
const Register= () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async(event) =>{
    event.preventDefault();
    try{
      await axios.post("http://localhost:3001/auth/register",{username, password});
      
      alert("Succesfully Registration! Now Login")
    }catch(err){
console.error(err);
alert("Registration failed. Please try again.");
    }

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
  const Form = ({username, setUsername ,password, setPassword, label, onSubmit,}) =>{
  return(
     <div className="auth-container">
    <form onSubmit={onSubmit}>
      <h2>{label}</h2>
      <div className="form-group">
      <label htmlFor="username"> Username :</label>
      <input 
      type="text" 
      id="username" 
      value={username} onChange={(event) =>  setUsername(event.target.value)} />
  </div>
  <div className="form-group">
      <label htmlFor="password"> Password :</label>
      <input 
      type="password" 
      id="password" 
      value={password} 
      onChange={(event) => setPassword(event.target.value)} />
  </div>
  <button type="submit">{label}</button>
  </form>
  </div>
   
  )};





  
