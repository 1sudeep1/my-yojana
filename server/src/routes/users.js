const {registerNewUser, loginUser, changePassword, getAllUsers} = require('../controllers/users')
const express= require('express')
const router= express.Router()


router.post('/register', registerNewUser)
router.post('/login', loginUser)
router.post('/change-password', changePassword)
router.get('/users', getAllUsers)

module.exports= router