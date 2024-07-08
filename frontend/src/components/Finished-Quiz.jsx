import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';



export default function Finished() {


    const {points, highscore, dispatch, questions} = useQuiz();
    const {user, updateUser} = useAuth();
    let {record} = user;

    const maxPoints = questions.reduce((accumulator, currentValue) => accumulator + currentValue.points, 0)

    const relativeScore = Math.ceil((points / maxPoints) * 100);
    let emoji; 
    if(relativeScore === 100) emoji = "🏅";
    else if(relativeScore >= 80 && relativeScore < 100) emoji = "😍";
    else if(relativeScore >= 50 && relativeScore < 80) emoji = "😊";
    else if(relativeScore >= 0 && relativeScore < 50) emoji = "😭";

    function handleFinishQuiz(){
      dispatch({type: "resetQuiz"})
    }


  return (
    <>
    <p className='result'>
       <span>{emoji}</span> You scored <strong>{points}</strong> out of {maxPoints} {` (${relativeScore})%`}
    </p>
    <p className='highscore'>Your Record: {record}%</p>
    <button className='btnQuiz btnQuiz-ui' onClick={handleFinishQuiz}
        >Run again</button>
    </>
    
  )
}
