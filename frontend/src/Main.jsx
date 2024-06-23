import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Todo from "./pages/Todo"
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import CreateAvatar from './pages/CreateAvatar';

export default function Main() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/todo" element={<ProtectedRoute>
              <Todo/>
              </ProtectedRoute>}/>
            <Route path='/avatar' element={<ProtectedRoute>
              <CreateAvatar/>
              </ProtectedRoute>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<Navigate to="/" />} />
            
        </Routes>
    </BrowserRouter>
  )
}
