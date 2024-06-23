import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from "../components/Footer";
import Button from '../components/Button';

export default function Login() {

    const [email, setEmail] = useState("mkx123@gmx.de");
    const [password, setPassword] = useState("!Ahmady16");
    const {loginUser, user, error, isLoading, dispatch, updateUser} = useAuth();
    
    const navigate = useNavigate();

    useEffect(() =>{
      dispatch({type: "resetError"})
    }, [])

    async function handleSubmit(e){
        e.preventDefault();
        await loginUser(email, password);
        

          
    }

    useEffect(function(){
      console.log("error: " + error);
      if(user){
        navigate("/home", {replace: true});
      }
    }, [user, navigate])



      return (
      <>
      <Header/>
      <form className="login" onSubmit={handleSubmit}>
          <h3>Log In</h3>
          
          <label>Email address:</label>
          <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
          />
          <label>Password:</label>
          <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
          />

          <Button type="submit">Submit</Button>
          {error && <div className='error'>{error}</div> }
    </form>
    <Footer/>
    </>
    
    )
  }

