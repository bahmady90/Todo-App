import React from 'react'
import styles from './AppLink.module.css'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTodos } from '../context/NoteContext';

export default function AppLink() {

  const {todos} = useTodos();
  const navigate = useNavigate();
  

  function handleClick(){
    navigate("/todo");
  }

  return (
    <div className={styles.appSorroundingDiv}>
      <div className={styles.appDiv} onClick={handleClick}>
        <img className={styles.app} src='calendar.svg'></img>
        <p id={styles.appP1}>Todo-App</p>
      </div>
      {todos.length === 1 ? <p id={styles.appP2}>currently <span style={{color: "blue", fontSize: "25px", fontWeight: "1000"}}>{todos.length}</span> open Todos 🥸</p> : <p id={styles.appP2}>Keep track with your schedule 📅</p>}
    </div>
  )
}
