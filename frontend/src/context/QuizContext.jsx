import { useReducer } from "react";
import { createContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useContext } from "react";

const QuizContext = createContext();


const BASE_URL = "https://the-trivia-api.com/api/questions?limit=10";

const initalState = {
  questions: [],
  status: "ready",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  loading: false

}


function reducer(state, action){

  switch(action.type){
    case "loading":
      return {...state, loading: true}
    case "loadingQuiz":
      return {...state, questions: action.payload, status: "active", loading: false};
    case "newAnswer":
      const question = state.questions[state.index];
      return{...state, answer: action.payload, 
          points: 
          action.payload === question.correctAnswer 
          ? state.points + question.points : state.points}
    case "nextQuestion":
      return {...state, answer: null, index: state.index + 1}
    case "finishQuiz":
      return {...state, status: "finished", 
        highscore: state.points > state.highscore ? state.points : state.highscore}
    case "resetQuiz":
      return{
        ...initalState
      }
    case "loadingComplete":
      return{...state, loading: false}
  }
}



function QuizProvider({children}){

  const [{questions, status, index, answer, points, highscore, secondsRemaining, loading}, dispatch] = useReducer(reducer, initalState);


  return (
    <QuizContext.Provider 
      value={{
        dispatch, questions, index, status, answer, 
        points, highscore, secondsRemaining, loading 
      }}
    >

    {children}

    </QuizContext.Provider>
  )

}

function useQuiz(){
  const context = useContext(QuizContext);
  if(context === undefined){
    throw new Error("QuizCOntext was used outside the QUizProvider")
  }
  else {return context};
}

export {QuizProvider, useQuiz}
  

    