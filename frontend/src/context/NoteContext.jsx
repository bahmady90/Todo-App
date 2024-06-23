import { createContext, useContext, 
    useEffect, useReducer } from "react";
import { useAuth } from '../context/AuthContext';


const BASE_URL = `http://localhost:4000/api/todos`;

const TodosContext = createContext();

const initialState = {
    todos: [],
    newTodo: {},
    isLoading: false,
    error: ""
}

function reducer(state, action){

    switch(action.type){
        case "todos/Loaded":
            return {todos: action.payload}
        case "rejected":
            return {...state, isLoading: false, error: action.payload}
        case "todo/Created": 
            return {
                ...state, 
                todos: [...state.todos, action.payload],
                newTodo: action.payload  
            }
        case "todo/Deleted":
            return {
                ...state,
                todos: state.todos.filter((todo) => todo._id !== action.payload._id),
                
            }
        case "sortTodos":
            return{...state, 
                todos: state.todos.sort((a,b) => a.dateObject - b.dateObject)
            }
        
    }
}

function TodosProvider({children}){

    const [{todos, newTodo, error, isLoading}, dispatch] = useReducer(reducer, initialState);
    const {user} = useAuth();

    useEffect(function(){
        async function fetchTodos(){
            try{
                const res = await fetch(`http://localhost:4000/api/todos`,{
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                }
                );
                const data = await res.json();
                dispatch({type: "todos/Loaded", payload: data})
            } catch(error){
                console.log(error.message);
            }
        }
        if(user){
            fetchTodos();
        }
        
    }, [dispatch, user])

    async function createTodo(newTodo){
        try{
            const res = await fetch(`${BASE_URL}`,
                {
                    method: "POST",
                    body: JSON.stringify(newTodo),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`
                        }            
                }
            );
            const data = await res.json();
            console.log(data);
            dispatch({type: "todo/Created", payload: data})
        } catch(error){
            dispatch({type: "rejected", payload: error.message})
        }
    }

    async function deleteTodo(todo){
        try{
            const res = await fetch(`${BASE_URL}/${todo._id}`,
                {   
                    headers: {"Authorization": `Bearer ${user.token}`},
                    method: "DELETE"
                }
            );
            const data = await res.json();
            console.log(data);
            dispatch({type: "todo/Deleted", payload: data})
        } catch(error){
            dispatch({type: "rejected", payload: error.message})
        }
    }


    return (
        <TodosContext.Provider 
            value={{
                todos,
                newTodo,
                isLoading ,
                error,
                createTodo,
                deleteTodo,
                dispatch
            }}
        >

        {children}

        </TodosContext.Provider>
    );

}

function useTodos(){
    const context = useContext(TodosContext);
    if(context === undefined){
        throw new Error("TodosContext was used outside the TodosProvider")
    }
    else{return context;}
}
export {TodosProvider, useTodos}