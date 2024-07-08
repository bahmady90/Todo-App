import React from 'react'
import { useQuiz } from '../context/QuizContext';

export default function Progress() {

  const {index, questions, points, answer} = useQuiz();
    
    
  const maxPoints = questions.reduce((accumulator, currentValue) => accumulator + currentValue.points, 0)
  
  return (
    <div className='progress'>
        <progress max={questions.length} value={index + Number(answer !== null)}></progress>
        <p>Question <strong>{`${index + 1} / ${questions.length}`}</strong> </p>
        <p><strong>{points}</strong> / {maxPoints} </p>
    </div>
  );
}
