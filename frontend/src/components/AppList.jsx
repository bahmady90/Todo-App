import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTodos } from '../context/NoteContext';
import styles from './AppLink.module.css'
import TodoLink from './TodoLink';
import QuizLink from './QuizLink';

export default function LinkList() {

  const {user} = useAuth();
  const {todos} = useTodos();
  const {name, loginDates} = user;
  
  const thisLoginDate = new Date(loginDates[loginDates.length - 1]).getTime();
  const lastLoginDate = loginDates.length > 1 && new Date(loginDates[loginDates.length - 2]).getTime();
  
  // last Login in sec
  const lastLoginTimeinMinutes = Math.round((thisLoginDate - lastLoginDate) / (1000 * 60));
  const lastLoginTimeinHours = Math.round((thisLoginDate - lastLoginDate) / (1000 * 60 * 60));
  const lastLoginTimeinDays = Math.round((thisLoginDate - lastLoginDate) / (1000 * 60 * 60 * 24));
  const lastLoginTimeinMonths = Math.round((thisLoginDate - lastLoginDate) / (1000 * 60 * 60 * 24 * 30));

  

  return (
    <div className='user-home gradient-background'>
      <h1>Welcome {name} 😊</h1>
      <p className={`${styles.pAppList}`}>
        {
          loginDates.length > 1 ?
          //conditionally rendering the last time the user logged in 
          ((lastLoginTimeinMinutes < 60 &&  `Last Login: ${lastLoginTimeinMinutes} minutes ago`) ||
          ((24 > lastLoginTimeinHours > 0)  &&  `Last Login: ${lastLoginTimeinHours} hours ago`) ||
          ((31 > lastLoginTimeinDays  > 0)  &&  `Last Login: ${lastLoginTimeinDays} days ago`) ||
          (lastLoginTimeinMonths > 0 &&  `Last Login: ${lastLoginTimeinMonths} Months ago`))
          : "First Login"
        }
      </p>
      <p className={`${styles.pAppList}`}>Check out the Apps 👇</p>
      <Link to="/simon">simon</Link>
      <div className={styles.appList}>
        <TodoLink/>
        <QuizLink/>
      </div> 
    </div>
  )
}
