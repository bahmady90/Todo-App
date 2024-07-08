import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useQuiz } from '../context/QuizContext'
import { useAuth } from '../context/AuthContext';
import StartScreen from '../components/StartScreen-Quiz';
import styles from "./Quiz.module.css";
import Loader from "../components/Loader-Quiz";
import Question from '../components/Question-Quiz';
import NextButton from '../components/NextButton-Quiz';
import Progress from "../components/Progress-Quiz";
import Finished from "../components/Finished-Quiz";


export default function Quiz() {

  const {status, questions} = useQuiz();



  return (
  <div className={`${styles.app}`}>
    <Header/>
    {status === "ready" && <StartScreen/>}
    {
      status === "active" && 
      <>
        <Progress/>
        <Question/>
        <NextButton/>

      </>
    }
    {status === "finished" && 
      <Finished/>
    
    }



    <Footer/>
  </div>
  )
}
