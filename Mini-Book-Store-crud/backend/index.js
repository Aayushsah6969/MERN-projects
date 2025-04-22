import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import router  from "./routes/book.route.js";
import cors from 'cors';


const app = express();

//Middleware to parse JSON request bodies
app.use(express.json());

app.use(cors())

app.get('/',(req, res)=>{
    res.send("Welcome to MERN Stack");
});

app.use('/api/books', router);

//Connection to database
mongoose.connect(mongodbURL)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server started on port ${PORT}`);
    } );
console.log('App connected to database');
})
.catch((error)=>{
console.log(error);
})