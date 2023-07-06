const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')

const connectDB = require("./config/database");

const bookRouter = require('./routes/books')
const quoteRouter = require('./routes/quotes')
const auth = require('./middleware/auth')



dotenv.config({ path: "./config/.env" });




connectDB()

const app = express();

app.use(express.json());

app.use('/api/user', require('./routes/api/user'))
app.use('/api/auth', require('./routes/api/auth'))


// Session
app.use(session({
    secret: 'corgi is the best period',
    resave: false,
    saveUninitialized: false,
    
}))

//  Passport middleware
// app.use(passport.initialize)
// app.use(passport.session)


const port = process.env.PORT || 6010;

app.use(cors());





app.use('/books', bookRouter);
app.use('/quotes', quoteRouter);




app.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on ${port} PORT `)
})