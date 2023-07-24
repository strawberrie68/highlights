const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const UserSchema = new mongoose.Schema({
 
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },


},
    { timestamps: true }
)

UserSchema.methods.generateAuthToken = function(){
   const token = jwt.sign({id:this.id}, process.env.JWT_SECRET, {expiresIn:"7d"}) 
   return token
}



const User= mongoose.model("User", UserSchema)

const validate = (data) => {
    const schema = Joi.object({

        username: Joi.string().required().label("Username"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    })

    return schema.validate(data)

}

module.exports = {User, validate}