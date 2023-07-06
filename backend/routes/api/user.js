const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
// const config = require('config')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: "./config/.env" });

//  User Model
const User = require('../../models/UserModel');
const { hash } = require('bcrypt');

const secret = process.env.jwtSecret

//  @route  POST api/user
//  @desc   Register new user
//  @access Public



router.post('/', (req, res) => {
    const { name, email, password } = req.body || {}
    // console.log(req.body)

    //  Simple validation
    if (!name || !password || !email) {
        return res.status(400).json({ msg: 'Please enter all fields' })

    }

    //  Check for extisting user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exist' })
        })

    const newUser = new User({
        name,
        email,
        password
    });

    //  Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash
            newUser.save()
                .then(user => {

                    jwt.sign(
                        { id: user.id },
                        secret,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )


                })
        })
    })


});

module.exports = router