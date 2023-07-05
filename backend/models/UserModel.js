const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


let userSchema = new mongoose.Schema({
    username: {
      type: String,
      index: true,
      unique: true,
      minlength: 2,
      maxlength: 16,
      lowercase: true,
      required: true,
  
    },
    password: {
      type: String,
      required: true,
    }
  })
  
  // Hash password before saving
  userSchema.pre('save', function(next) {
    let user;
  
    // If not registration
    if ( !user.isModified('password') ) return next()
  
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
  
  // Password verification
  userSchema.methods.login = function(password) {
    let user = this
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if ( err ) { reject(err) }
        resolve()
      })
    })
  }
  
  // Export Mongoose "User" model
  module.exports = mongoose.model('User', userSchema)