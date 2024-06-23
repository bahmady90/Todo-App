import  { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';

export default function SignUp() {

    const {user, isLoading, error, signupUser, dispatch} = useAuth();
    const [email, setEmail] = useState("mkx123@gmx.de");
    const [password, setPassword] = useState("!Ahmady16");
    const [passwordRepeat, setPasswordRepeat] = useState("!Ahmady16");
    const [name, setName] = useState("Belol");
    const navigate = useNavigate();

    

    useEffect(() =>{
      dispatch({type: "resetError"})
    }, [])
    

    async function handleSubmit(e){
        e.preventDefault();
        await signupUser(email, name, password, passwordRepeat);
        if(user){
          navigate("/todo");
        }
    }

   
    return (
      <>
        <form className="signup" onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          
          <label>Email address:</label>

          <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
          />
          <label>Name:</label>
          <input 
            type="Name" 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
          />
          <label>Password:</label>
          <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
          />
          <label>Repeat Password:</label>
          <input 
            type="password" 
            onChange={(e) => setPasswordRepeat(e.target.value)} 
            value={passwordRepeat} 
          />
    
          <Button disabled={isLoading} type="submit">Submit</Button>
          <p>Already got an account? <Link to="/login">Login</Link></p>
          {error && <div className="error">{error}</div>}
        </form>
      </>
      )
}
