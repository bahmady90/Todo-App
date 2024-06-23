import { createContext, useContext, useReducer, useEffect } from "react";




const BASE_URL = `http://localhost:4000/api/user`;

const AuthContext = createContext();

const initialState = {
    user: null,
    error: null,
    isLoading : false
}

function authReducer(state, action){

    switch(action.type){
        case "login":
            return {
                ...state,
                isLoading: false,
                user: action.payload
            }
        
        case "signup":
            return {
                ...state,
                isLoading: false,
                user: action.payload
            }
        case "logout":
            return {
                initialState
            }
        case "login/Error":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        
        case "isloading":
            return{
                ...state,
                isLoading: true
            }
        case "updateAvatar":
            return {
                ...state, 
                user: action.payload
            }
        case "resetError":
            return {
                ...state, 
                error: null
            }
        default:
            return state;
            
    }

}

function AuthProvider({children}){

    const [{user, error, isLoading}, dispatch] = useReducer(authReducer, initialState);
    

    useEffect(function(){
        const user = JSON.parse(localStorage.getItem("user"));
        if(user){
            dispatch({type: "login", payload: user});
        }
    },[])


    async function loginUser(email, password){
        
        dispatch({type: "isloading"});

        
            const res = await fetch(`${BASE_URL}/login`,
                {
                  method: "POST",
                  headers: {"Content-type": "application/json"},
                  body: JSON.stringify({
                    email,
                    password
                  }),
                }
            );
            const data = await res.json();
            console.log(data);
            if(res.ok){
                dispatch({type: "login", payload: data});
                localStorage.setItem("user", JSON.stringify(data));
            }
            if(!res.ok){
                dispatch({type: "login/Error", payload: data.error})
            }
            
        
            
        }
         
    

    async function signupUser(email, name, password, passwordRepeat){

        dispatch({type: "isloading"});

        const res = await fetch(`${BASE_URL}/signup`,
            {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                email, 
                name, 
                password, 
                passwordRepeat
                }),
            }
        );
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch({type: "login", payload: data});
            localStorage.setItem("user", JSON.stringify(data));
        }
        if(!res.ok){
            dispatch({type: "login/Error", payload: data.error})
        } 
    }

    async function updateUser(id, newUser){

        dispatch({type: "isloading"});

        const res = await fetch(`${BASE_URL}/${id}`,
            {
                method: "PATCH",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(newUser)

            }
        );
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch({type: "updateAvatar", payload: newUser});
            localStorage.setItem("user", JSON.stringify(data));
        }
        if(!res.ok){
            dispatch({type: "login/Error", payload: data.error})
        }

    }

    return(
        <AuthContext.Provider
            value={{
                user,
                error,
                isLoading,
                signupUser,
                loginUser,
                dispatch,
                updateUser

            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


function useAuth(){
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error("AuthContext was used outside the TodosProvider")
    }
    else{return context;}
}

export {useAuth, AuthProvider}