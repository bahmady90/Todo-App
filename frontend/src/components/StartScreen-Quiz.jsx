import React, { useEffect, useState } from 'react'
import styles from './Quiz.module.css'
import { useQuiz } from '../context/QuizContext'
import buttonStyles from "./Button.module.css";
import { useAuth } from '../context/AuthContext';
import Loader from './Loader-Quiz';


export default function StartScreen() {


  
  const {dispatch, questions, loading} = useQuiz();
  const {user} = useAuth();
  const [genre, setGenre] = useState(9);
  const [amount, setAmount] = useState(5);
  const [difficulty, setDifficulty] = useState("medium");

  

  const maxPoints = questions.reduce((accumulator, currentValue) => accumulator + currentValue.points, 0)

  
  
  async function fetchQuiz(){

    dispatch({type: "loading"});

    try{
      const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=
        ${genre}&difficulty=${difficulty}&type=multiple&encode=url3986`);
      const {results} = await response.json();
      // decoding the question and answer-strings
      const newData = results.map((element) => {
        console.log(element.correct_answer);
        const correctAnswer = decodeURIComponent(element.correct_answer);
        console.log(correctAnswer);
        const question = decodeURIComponent(element.question);
        const decodedIncorrectAnswers = element.incorrect_answers.map((el) => {
          return (
            element = decodeURIComponent(el)
          )
        })
        console.log(decodedIncorrectAnswers);
        const answers = [...decodedIncorrectAnswers, correctAnswer];
        //returning the result-array with decoded strings
        return {question, answers, correctAnswer};
      })
      // creating a formated data-array where the right answer has a random index in the answers-array
      let dataFormated = [];
      newData.forEach((element) => {
      let options = [];
      while(options.length < 4){
        const randomNumber = Math.floor(Math.random() * 4);
        if(options.includes(element.answers[randomNumber]) === false){
          options.push(element.answers[randomNumber]);
        }
      }
      let correctAnswer = 0;
      options.forEach((option)=> {
        if(option === element.correctAnswer){
          correctAnswer = options.indexOf(option);
        }
      })
      const {question} = element;
      const points = 10;
      dataFormated.push({question, correctAnswer, options, points})
    })
    // Adding the formatted and decoded result-array to global state
    dispatch({type: "loadingQuiz", payload: dataFormated})
  } catch(error){
    console.log(error.message)
    dispatch({type : "loadingComplete"})
    }
  }
      
    function submitLoadingQuiz(e){
      e.preventDefault();
      fetchQuiz();
    }


  if(loading === true) {return <Loader/>}

  return (
    <div className={styles.start}>
        <h2>Welcome to the Quiz-Challenge!</h2>
        <form className={`${styles.form}`}>
         <div className={`${styles.genre}`}> 
            <label>Genre</label>
            <select value={genre} onChange={(e) => setGenre(Number(e.target.value))}>
            <option value={9}  >Genral Knowlege</option>
              <option value={24}>Politics</option>
              <option value={21}>Sports</option>
              <option value={11}>Movies</option>
              <option value={17}>Nature</option>
              <option value={27}>Animals</option>
              <option value={19}>Mathematics</option>
            </select>
         </div>
         <div className={`${styles.difficulty}`}>
            <label>Difficulty</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          <div className={`${styles.amount}`}>
            <label>Amount</label>
            <select value={amount} onChange={(e) => setAmount(Number(e.target.value))}>
              <option value={5} >05</option>
              <option value={10} >10</option>
              <option value={20} >20</option>
            </select>
          </div>
          <button className={`${buttonStyles.btn} ${buttonStyles.submit}`}
            onClick={submitLoadingQuiz}
             >lets start</button>
        </form>
        
    </div>
  )
}
