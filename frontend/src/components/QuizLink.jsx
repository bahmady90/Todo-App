import React from 'react'
import styles from './AppLink.module.css'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTodos } from '../context/NoteContext';


export default function QuizLink() {

  const {todos} = useTodos();
  const navigate = useNavigate();
  const {user} = useAuth();
  const {record} = user;
  

  function handleClick(){
    navigate("/quiz");
  }

  return (
    <div className={styles.appSorroundingDiv}>
      <div className={styles.appDiv} onClick={handleClick}>
        <img className={styles.app} src='quiz.svg'></img>
        <p id={styles.appQuizP1}>Quiz</p>
      </div>
      {record !== null ? <p id={styles.appP2}>current record: <span style={{color: "blue", fontSize: "25px", fontWeight: "1000"}}>{record}%</span></p> : <p id={styles.appP2}>Challenge your Knowlegde!</p>}
    </div>
  )
}