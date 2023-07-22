const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')

const connectDB = require("./config/database");


require("dotenv").config({ path: "./config/.env" });


// routes
const bookRouter = require('./routes/books')
const quoteRouter = require('./routes/quotes')
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')


const app = express();
const port = process.env.PORT || 6010;

// pass the passport middleware


app.use(cors());
app.use(express.json());


connectDB()

//  routes
app.use('/books', bookRouter);
app.use('/quotes', quoteRouter);
app.use('/api/users', userRouter )
app.use('/api/auth', authRouter)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})