const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require('validator')


const Schema = mongoose.Schema


const UserSchema = new Schema({
    Name:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true,
        unique: true
    },
    PNumber:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    Role:{
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    }
},{timestamps: true})


UserSchema.statics.Signup = async function(Name, Email, PNumber, Password, Role){
    if(!Name || !Email || !PNumber || !Password ){
        throw Error("All Fields must be filled in!!")
    }
    
    if(!validator.isEmail(Email)){
        throw Error("Email is not valid")
    }

    if(!validator.isStrongPassword(Password)){
        throw Error("Password needs to be Stronger")
    }

    const exists = await this.findOne({Email})

    if(exists){
        throw Error('Email Already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(Password, salt)

    const user = await this.create({Name, Email, PNumber, Password : hash, Role, PaymentMethods})
    return user

}


UserSchema.statics.Login = async function(Email, Password) {
    if(!Email || !Password){
        throw Error("All Fields must be filled in!!")
    }

    if(!validator.isEmail(Email)){
        throw Error("Email is not valid")
    }

    const user = await this.findOne({Email});

    if(!user){
        throw Error("User does not exist")
    }
    const password = user.Password
    const match  = await bcrypt.compare(Password, password)

    if(!match){
        throw Error("Wrong Password")
    }

    return user

}


module.exports = mongoose.model('User', UserSchema)