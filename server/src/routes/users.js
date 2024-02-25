const {registerNewUser, loginUser, changePassword} = require('../controllers/users')
const express= require('express')
const router= express.Router()


router.post('/register', registerNewUser)
router.post('/login', loginUser)
router.post('/change-password', changePassword)

module.exports= router