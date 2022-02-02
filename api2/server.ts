require("dotenv").config()
const express = require ("express");
const app = express();

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3001' }));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const port = process.env.PORT || 4000

const db = mongoose.connection
db.on("error", ()=>console.log("Error"))
db.once("open",()=>console.log("Connected to Database"))

app.use (express.json())

const studentRouter = require("./routes/students")
app.use('/students', studentRouter)

app.listen(port,()=> console.log(`Server started on port: ${process.env.PORT}`))