const {registerNewUser, loginUser} = require('../controllers/users')
const express= require('express')
const router= express.Router()


router.post('/register', registerNewUser)
router.post('/login', loginUser)

module.exports= router