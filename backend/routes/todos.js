const express = require("express");
const Todo = require("../models/todoModel");
const mongoose = require('mongoose');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
  const user_id = req.user._id;

  const todos = await Todo.find({user_id}).sort({createdAt: 1})
  res.status(200).json(todos)
})

router.post("/", async (req, res) => {
    const {date, text, isImportant, time, dateObject} = req.body;
    let emptyFields = []

  if(!date){
    emptyFields.push("date");
  } else if (!text){
    emptyFields.push("text")
  }

  if(emptyFields.length > 0){
    return res.status(400).json({error: "Please fill in all the fields", emptyFields})
  }
  // add to the database
  try {
    const user_id = req.user._id;
    const todo = await Todo.create({ date, text, isImportant, time, dateObject, user_id })
    res.status(200).json(todo)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such Todo'})
    }
  
    const todo = await Todo.findOneAndDelete({_id: id})
  
    if(!todo) {
      return res.status(400).json({error: 'No such Todo'})
    }
  
    res.status(200).json(todo);
})

router.patch("/:id", (req, res) => {
    res.json({msg: "Update a todos"})
})

module.exports = router