const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');



const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "300d"})
}

const router = express.Router();

//login route 

router.post("/login", async (req, res) => {

    const {email, password} = req.body;
    
    try{
        const user = await User.login(email, password);
        
        
        const {name, avatar, loginDates, id, record} = user;
        loginDates.splice(0, (loginDates.length - 3));
        console.log(loginDates);
        const updatedLoginDates = loginDates.concat(new Date());

        

        //create a token
        const token = createToken(user._id);

        const updatedUser = {email, token, name, avatar, id, loginDates: updatedLoginDates, record}
        await User.findOneAndUpdate({_id: id}, {...updatedUser})
        
        res.status(200).json({...updatedUser, token});
    }catch(error){
        res.status(400).json({error: error.message})
    }
})


// sign up route

router.post("/signup", async (req, res) => {

    const {email, name, password, passwordRepeat} = req.body;
    
    try{
        const user = await User.signup(email, name, password, passwordRepeat);
        console.log(user);
        let {loginDates, record} = user;
        const id = user._id;
        //create a token
        const token = createToken(user._id)
        
        
        res.status(200).json({email, token, name, avatar: "default.svg", id, loginDates, record})
        // res.status(200).json(user);
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

//update user

router.patch("/:id", async (req, res) => {

    
    
    const {id} = req.params;
    console.log(id);
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'id doesnt excist'})
      }

    const user = await User.findOneAndUpdate({_id: id}, {...req.body})

    if (!user) {
        return res.status(400).json({error: 'No such user'})
      }
    res.status(200).json(user)
})



module.exports = router;
