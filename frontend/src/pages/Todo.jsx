import React, { useContext, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import { useTodos } from "../context/NoteContext";


function App() {

  const {todos} = useTodos();
  console.log(todos);
  const sortedTodos = todos.slice()
  .sort((a, b) => {
    return new Date(a.dateObject) - new Date(b.dateObject)
  })
  

  
  const initialValue = 0;
  const counter = todos.reduce((acc) =>
    acc + 1, initialValue
  )


  
                
                
   
  return ( 
         
      <>
        <Header/>
        <div className="container">
          <div id="gif"><img src="sigma.gif" alt="sigma"></img></div>
          <div className="stats-todo"><p>Total of: <span style={{fontSize: "40px", color: "#00008B", fontWeight: "bolder", textShadow: "-1px 1px 0 white ,1px 1px 0 #000, 1px -1px 0 white, -1px -1px 0 white"
             }}>{counter}</span> Todo {counter === 1 ? "" : "'s"}</p></div>
          <CreateArea/>
          <div className="notes">
          {sortedTodos.map((todo) => {
            return (
              <Note
                todo={todo}
                key={todo._id}
              /> 
            );
          })
          }
          </div>
        </div>
        <Footer />
      </>
         
    );
  
}

export default App;
