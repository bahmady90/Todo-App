import React from 'react'
import styles from './AppLink.module.css'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTodos } from '../context/NoteContext';

export default function AppLink() {

  const {todos} = useTodos();
  const navigate = useNavigate();
  console.log(todos);

  function handleClick(){
    navigate("/todo");
  }

  return (
    <div className={styles.appSorroundingDiv}>
      <div className={styles.appDiv} onClick={handleClick}>
        <img className={styles.app} src='calendar.svg'></img>
        <p id={styles.appP1}>Todo-App</p>
      </div>
      <p id={styles.appP2}>{todos.length === 1 ? `currently ${todos.length} open Todos 🥸`: "Keep track with your schedule 📅"}</p>
    </div>
  )
}
