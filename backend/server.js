require('dotenv').config()
const bodyParser = require('body-parser');

const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todos");
const userRoutes = require("./routes/user")
var cors = require("cors");

//express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

//routes
app.use(cors());
app.use("/api/todos", todoRoutes);
app.use("/api/user", userRoutes);


//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {app.listen(process.env.PORT, () => {
        console.log("connected to db & listening to port 4000")
    })})
    .catch((error) => console.log(error))



