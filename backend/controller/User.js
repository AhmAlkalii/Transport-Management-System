const jwt = require("jsonwebtoken")
const User = require("../model/User")
const validator = require("validator")



const createToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn:'2d'})
}

const getUsers = async(req, res) =>{
    const user = await User.find();

    res.status(200).json(user)
}

const getUser = async (req, res) => {
    const { id } = req.params

    const user = await User.findById({_id : id})

    res.status(200).json(user)
}


const createUser = async (req, res) => {
    const {Name, Email, PNumber, Password, Role} = req.body

    try{
        
        const user = await User.Signup(Name, Email, PNumber, Password, Role)
        const token = await createToken(user._id)

        res.status(200).json({user, token})

    }
    catch(err){
        res.status(400).json({err: err.message})
    }
}

const userLogin = async(req, res) => {
    const {Email, Password} = req.body

    try{
        const user = await User.Login(Email, Password)
        const token = await createToken(user._id)

        res.status(200).json({user, token})
    }
    catch(err){
        res.status(400).json({err: err.message})
    }
}


const updateUser = async(req, res) => {

    const {Name, Email, PNumber, Password, Role, PaymentMethods} = req.body

    const filter = {Email : Email}
    const update = {}
    try{

        if(Email && !validator.isEmail(Email)){
            throw new Error("Email not valid")
        }

        if(Password && !validator.isStrongPassword(Password)){
            throw new Error("Password not strong enough")
        }

        if(Name) update.Name = Name
        if(PNumber) update.PNumber = PNumber
        if(Role) update.Role = Role
        if(PNumber) update.PNumber = PNumber
        if(PNumber) update.PaymentMethods = PaymentMethods

        if(Password){
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(Password, salt)   
            update.Password = hash 
        }



        const user = await User.findOneAndUpdate(filter,update,{
            new: true
        })

        res.status(200).json({user})

    }
    catch(err){
        res.status(400).json({err: err.message})
    }
}


const deleteUser = async(req, res) => {
    const {id} = req.params

    try{
        const user = await User.findByIdAndDelete({ _id : id })

        res.status(204).json("User deleted")
    }
    catch(err){
        res.status(400).json({err: err.message})
    }
}

module.exports = {getUser, getUsers, createUser, userLogin, updateUser, deleteUser}

