import { useState } from "react";
import axios from 'axios';
import backgroundImg from '../assets/images/meal3.jpg';
export const AuthPage = ()=> {
  return <div  className="auth">
    <Login />
    <SignUp />
  </div>
  
}


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try{
      await axios.post("http://localhost:3001/auth/login",{username, password});
      const { token, userID } = response.data;
      alert("Succesfully Logged In!")

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
  etPassword={setPassword}
  label="Login"
  onSubmit={onSubmit}
  />)};
  

 
const SignUp = () => {
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
   label="Register"
   onSubmit={onsubmit}
   />)};
  const Form = ({username, setUsername ,password, setPassword, label, onSubmit,}) =>{
  return(
     <div className="auth=container">
    <form onSubmit={onSubmit}>
      <h2>{label}</h2>
      <div className="form=group">
      <label htmlFor="username"> Username :</label>
      <input 
      type="text" 
      id="username" 
      value={username} onChange={(event) =>  setUsername(event.target.value)} />
  </div>
  <div className="form=group">
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





  
