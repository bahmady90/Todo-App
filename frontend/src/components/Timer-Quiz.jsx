import React, { useEffect } from 'react'
import styles from './Quiz.module.css'

export default function Timer({dispatch, secondsRemainings}) {

  const minutes = Math.floor(secondsRemainings / 60);
  const seconds = secondsRemainings % 60;

  useEffect(function(){

      const id = setInterval(() => {
        dispatch({type: "tick"});
      }, 1000);

      return () => clearInterval(id);
    } , [dispatch]);

    
  return (
    <div className={styles.timer}>{minutes < 10 ? `0${minutes}`: `${minutes}`}
      : {seconds < 10 ? `0${seconds}` : seconds}
    </div>
  )
}
