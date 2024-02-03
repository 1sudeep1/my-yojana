const {registerNewUser} = require('../controllers/users')
const express= require('express')
const router= express.Router()


router.post('/register', registerNewUser)

module.exports= router