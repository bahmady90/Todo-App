import React from 'react'
import Options from './Options-Quiz';
import { useQuiz } from '../context/QuizContext';
import styles from "./Quiz.module.css";

export default function Question() {



    const {questions, index, dispatch, answer,} = useQuiz();
    const question = questions[index];
    

  return (
      <div>
        <h4>{question.question}</h4>
          <Options 

          />
      </div>
  )
}
