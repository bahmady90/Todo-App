import React from 'react'
import { useQuiz } from '../context/QuizContext';
import styles from "./Quiz.module.css";

export default function Options() {


  const {questions, dispatch, answer, index} = useQuiz();

  const question = questions[index];
  

  return (
    <div className='options'>
        {question.options.map((option, index) => (
            <button className=
                {`btnQuiz btnQuiz-option ${index === answer ? "answer": ""}
                ${answer === null ? "" 
                : index === question.correctAnswer ? 
                "correct" : "wrong"}`}
                key={option}
                disabled={answer? true : false}
                onClick={() => dispatch({type: "newAnswer",
                    payload: index
                })}
                >
            {option} </button>
        ))}
        
    </div>
  );
}
