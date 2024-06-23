import React, { useEffect } from 'react';
import SignUp from '../components/SignUp';
import Header from '../components/Header';
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppList from '../components/AppList';

export default function Home() {

  const {user} = useAuth();

  
  return (
    <div>
      <Header/>
      {user ? <AppList/> :
        <SignUp/>
      }
      <Footer/> 
    </div>
  )
}
