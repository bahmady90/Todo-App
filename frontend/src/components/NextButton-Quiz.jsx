import React from 'react'
import { useQuiz } from '../context/QuizContext'
import { useAuth } from '../context/AuthContext';

export default function NextButton() {

    const {dispatch, answer, index, questions, points, highscore} = useQuiz();
    const {user, updateUser} = useAuth();
    let {record} = user;

    const maxPoints = questions.reduce((accumulator, currentValue) => accumulator + currentValue.points, 0)

    const relativeScore = Math.ceil((points / maxPoints) * 100);

    const numberOfQuestions = questions?.length;

    function handleClick(){

      if(index !== numberOfQuestions - 1 ){
        dispatch({type: "nextQuestion"})
      }
      else if(index === numberOfQuestions - 1){
        if(relativeScore > record){
          console.log("test123");
          const newUser = {...user, record: relativeScore}
          updateUser(user.id, newUser);
          dispatch({type: "finishQuiz"});
        }
        dispatch({type: "finishQuiz"});
      }

    }



    if(answer === null) return null

    return (
    <button className='btnQuiz btnQuiz-ui'
    onClick={handleClick}
      >{index !== numberOfQuestions - 1 ? "Next" : "submit"}</button>
  )
}
