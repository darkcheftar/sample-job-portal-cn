//Loading Configuration
require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on('error',(e)=>console.error(e));
db.once('open',()=>{
    console.log("connected to database");
})

app.use(express.json())

// routes
const usersRoute = require("./routes/users");
app.use('/users', usersRoute)

const jobsRoute = require("./routes/jobs");


// Starting server
app.listen(3000, ()=>{
   console.log("server started");
});