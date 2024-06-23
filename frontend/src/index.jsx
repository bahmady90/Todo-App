import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import { TodosProvider } from "./context/NoteContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.render(

<AuthProvider>
     <TodosProvider>
          <Main />
     </TodosProvider>
</AuthProvider>

, document.getElementById('root'));




