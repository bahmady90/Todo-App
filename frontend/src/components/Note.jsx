import React from "react";
import { useTodos } from "../context/NoteContext";
import { useAuth } from "../context/AuthContext";




function Note ({todo}) {

  const {deleteTodo} = useTodos();
  const {user} = useAuth();
  const {date, time, text, createdAt} = todo;
  const dateNow = new Date();

  
  function handleClick() {
    if(user){
      deleteTodo(todo);
      document.getElementById("gif").style.display = "block";
      setTimeout(() =>{
        document.getElementById("gif").style.display = "none";
      }, 1600);
    }
    
  }

// converting the createdAt-Value into a better format

 const convertedCreatedAt = new Date(createdAt).getTime()
 const convertedDateNow = dateNow.getTime();
 const resultInSekonds = (convertedDateNow - convertedCreatedAt);
 const result = Math.round((resultInSekonds / 86400000));
 
  
  
  

  return (
      
      <div className={`note ${todo.isImportant ? "priority" : ""}`}>
      <h1>{date}</h1>
      <p>{time}</p>
      <p>{text}</p>
      <p>{result === 0 ? "Created today" : `Created ${result} days ago`}</p>
      <button onClick={handleClick}>
        <img src="done.svg"></img>
      </button>
    </div>
    
  );
}

export default Note;
