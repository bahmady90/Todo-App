import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {


    const {user} = useAuth();
    console.log(user);
    const navigate = useNavigate();

    useEffect(function(){
        if(!user) navigate("/");
    },[user, navigate])

  return user ? children : null;
}
