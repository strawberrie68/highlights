const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport');
const connectDB = require("./config/database");


require("dotenv").config({ path: "./config/.env" });


// routes
const bookRouter = require('./routes/books')
const quoteRouter = require('./routes/quotes');



const app = express();
const port = process.env.PORT || 6010;

// pass the passport middleware
app.use(passport.initialize());

app.use(cors());
app.use(express.json());


connectDB()

//  routes
app.use('/books', bookRouter);
app.use('/quotes', quoteRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})