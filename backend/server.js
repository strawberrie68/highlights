const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')


const connectDB = require("./config/database");


require("dotenv").config();


// routes
const bookRouter = require('./routes/books')
const quoteRouter = require('./routes/quotes')
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')


const app = express();

const port = process.env.PORT || 6010;

// pass the passport middleware


app.use(cors());
app.use(express.json());


connectDB()

//  routes
app.use('/books', bookRouter);
app.use('/quotes', quoteRouter);
app.use('/api/users', userRoutes )
app.use('/api/auth', authRoutes)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})