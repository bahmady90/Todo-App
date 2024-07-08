import React from 'react'
import Options from './Options-';

export default function Question({questions, index, dispatch, answer, correct}) {

    const question = questions[index];
    

  return (
      <div>
        <h4>{question.question}</h4>
          <Options question={question}
            dispatch={dispatch}
            answer={answer}
            correct={correct}
          />
      </div>
  )
}
