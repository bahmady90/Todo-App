import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import  Button  from "./Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";


function Header() {

  const {user, dispatch} = useAuth();
  // console.log(user.avatar);
  console.log(user);
  const navigate = useNavigate();


  function handleLogOut(){
    dispatch({type: "logout"});
    localStorage.removeItem("user");
    navigate("/");
  }

  function handleClick(){
    navigate("/login");
  }

  function handleClickHome(){
    navigate("/");
  }

  return (
    <header className="gradient-background">
      <h1>
        <HighlightIcon />
        MyApp
      </h1>
      {user && <p className="email-p">{user.email}</p>}
      <div className="navbar">
      <Button type="header-button" onClick={handleClickHome}>Home</Button>
        {user ?
        <>
          {/* <Avatar img={user.avatar}/> */}
          <div onClick={() => navigate("/avatar")}>
            <img src={user.avatar} alt="avatarimage"></img>
          </div>
          <Button type="logout" onClick={handleLogOut}>Logout</Button>
        </>
          :
        <Button type="header-button" onClick={handleClick}>Login</Button>
        }
      </div>
    </header>
  );
}

export default Header;
