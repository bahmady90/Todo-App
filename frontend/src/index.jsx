import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import { TodosProvider } from "./context/NoteContext";
import { AuthProvider } from "./context/AuthContext";
import { QuizProvider } from "./context/QuizContext";

ReactDOM.render(

<AuthProvider>
     <TodosProvider>
          <QuizProvider>
               <Main />
          </QuizProvider>
     </TodosProvider>
</AuthProvider>

, document.getElementById('root'));




