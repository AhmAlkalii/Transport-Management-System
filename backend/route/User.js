const express = require("express")
const { getUser, getUsers, createUser, userLogin, updateUser, deleteUser } = require("../controller/User")

const router = express.Router()



router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/signup', createUser)
router.post('/login', userLogin)
router.post('/edit', updateUser)
router.post('/delete', deleteUser)


module.exports = router