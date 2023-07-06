const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
// const config = require('config')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: "./config/.env" });
const auth = require('../../middleware/auth')

//  User Model
const User = require('../../models/UserModel');
const { hash } = require('bcrypt');

const secret = process.env.jwtSecret

//  @route  POST api/user
//  @desc   Auth user
//  @access Public
router.post('/', (req, res) => {
    const { email, password } = req.body || {}

    //  Simple validation
    if (!password || !email) {
        return res.status(400).json({ msg: 'Please enter all fields' })

    }

    //  Check for extisting user
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist' })

            //validate password
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'})

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


});

//  @route  GET api/auth/user
//  @desc   GET user data
//  @access Private
router.get('/user', auth, (req ,res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

module.exports = router